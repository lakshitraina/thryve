# PowerShell Static HTTP Server for THRYVE
param(
    [int]$Port = 3000,
    [string]$Path = "f:\THRYVE"
)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "THRYVE dev server active at http://localhost:$Port/"

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # CORS and Caching Headers
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Password")
        $response.AddHeader("Cache-Control", "no-cache")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 204
            $response.OutputStream.Close()
            continue
        }

        $urlPath = $request.Url.LocalPath
        $adminPassHash = "5480a1450bf6baf7da27ba90884f100c31c09863bb5f7ff30b084642fe511b87"
        function Test-AdminPass([string]$p) {
            if ([string]::IsNullOrWhiteSpace($p)) { return $false }
            if ($env:ADMIN_PASSCODE -and $p -eq $env:ADMIN_PASSCODE) { return $true }
            try {
                $b = [System.Text.Encoding]::UTF8.GetBytes($p)
                $h = [System.Security.Cryptography.SHA256]::Create().ComputeHash($b)
                $hex = [BitConverter]::ToString($h).Replace('-', '').ToLower()
                return ($hex -eq $adminPassHash)
            } catch { return $false }
        }
        $analyticsPath = Join-Path $Path "data\analytics.json"

        # Handle API Routes
        if ($urlPath -eq "/api/analytics/track" -and $request.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
            $bodyText = $reader.ReadToEnd()
            $payload = try { $bodyText | ConvertFrom-Json } catch { $null }

            $stats = try {
                if (Test-Path $analyticsPath) {
                    Get-Content $analyticsPath -Raw | ConvertFrom-Json
                } else { $null }
            } catch { $null }

            if (-not $stats) {
                $stats = [PSCustomObject]@{
                    totalViews = 0
                    uniqueVisitors = 0
                    registerClicks = 0
                    ctaBreakdown = [PSCustomObject]@{
                        navbar = 0; hero_cta = 0; spotlight_card = 0; events_list = 0; registration_page = 0; bottom_banner = 0; other = 0
                    }
                    visitorIds = @()
                    recentEvents = @()
                    lastUpdated = (Get-Date).ToString("o")
                }
            }

            $eventType = if ($payload.event) { $payload.event } else { "page_view" }
            $vid = if ($payload.visitorId) { [string]$payload.visitorId } else { $null }
            $page = if ($payload.page) { [string]$payload.page } else { "/" }
            $cta = if ($payload.cta) { [string]$payload.cta } else { "other" }

            if ($eventType -eq "page_view") {
                $stats.totalViews = [int]$stats.totalViews + 1
                $vList = [System.Collections.Generic.List[string]]::new()
                if ($stats.visitorIds) { foreach ($v in $stats.visitorIds) { [void]$vList.Add([string]$v) } }
                if ($vid -and -not $vList.Contains($vid)) {
                    $vList.Add($vid)
                }
                $stats.visitorIds = $vList.ToArray()
                $stats.uniqueVisitors = [Math]::Max(1, $stats.visitorIds.Length)
            } elseif ($eventType -eq "register_click") {
                $stats.registerClicks = [int]$stats.registerClicks + 1
                if ($stats.ctaBreakdown -and $stats.ctaBreakdown.PSObject.Properties[$cta]) {
                    $stats.ctaBreakdown.$cta = [int]$stats.ctaBreakdown.$cta + 1
                }
            }

            $recentList = [System.Collections.Generic.List[object]]::new()
            $recentList.Add([PSCustomObject]@{
                id = (Get-Date).Ticks.ToString()
                type = $eventType
                page = $page
                cta = if ($eventType -eq "register_click") { $cta } else { $null }
                timestamp = (Get-Date).ToString("o")
            })
            if ($stats.recentEvents) {
                $count = 0
                foreach ($ev in $stats.recentEvents) {
                    if ($count -lt 40) { $recentList.Add($ev); $count++ }
                }
            }
            $stats.recentEvents = $recentList.ToArray()
            $stats.lastUpdated = (Get-Date).ToString("o")

            $stats | ConvertTo-Json -Depth 6 | Set-Content $analyticsPath -Encoding UTF8

            $resJson = [PSCustomObject]@{
                success = $true
                totalViews = $stats.totalViews
                registerClicks = $stats.registerClicks
                uniqueVisitors = $stats.uniqueVisitors
            } | ConvertTo-Json

            $bytes = [System.Text.Encoding]::UTF8.GetBytes($resJson)
            $response.ContentType = "application/json; charset=utf-8"
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.OutputStream.Flush()
            $response.OutputStream.Close()
            continue
        }

        if ($urlPath -eq "/api/analytics/data") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
            $bodyText = $reader.ReadToEnd()
            $payload = try { $bodyText | ConvertFrom-Json } catch { $null }

            $authHeader = ($request.Headers["Authorization"] -replace "^Bearer\s+", "")
            $passHeader = $request.Headers["X-Admin-Password"]
            $queryPass = $request.QueryString["auth"]
            if (-not $queryPass) { $queryPass = $request.QueryString["password"] }
            $bodyPass = if ($payload) { $payload.password } else { $null }

            $isAuthed = (
                (Test-AdminPass $bodyPass) -or
                (Test-AdminPass $queryPass) -or
                (Test-AdminPass $passHeader) -or
                (Test-AdminPass $authHeader)
            )

            if (-not $isAuthed) {
                $resJson = [PSCustomObject]@{ success = $false; error = "Unauthorized" } | ConvertTo-Json
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($resJson)
                $response.ContentType = "application/json; charset=utf-8"
                $response.ContentLength64 = $bytes.Length
                $response.StatusCode = 401
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                $response.OutputStream.Flush()
                $response.OutputStream.Close()
                continue
            }

            $stats = try {
                if (Test-Path $analyticsPath) {
                    Get-Content $analyticsPath -Raw | ConvertFrom-Json
                } else { $null }
            } catch { $null }

            $tViews = if ($stats) { [int]$stats.totalViews } else { 0 }
            $rClicks = if ($stats) { [int]$stats.registerClicks } else { 0 }
            $uVisitors = if ($stats) { [int]$stats.uniqueVisitors } else { 0 }
            $rate = if ($tViews -gt 0) { [string][Math]::Round(($rClicks / $tViews) * 100, 1) + "%" } else { "0.0%" }

            $regsFile = Join-Path $Path "data\registrations.json"
            $regsCount = try { if (Test-Path $regsFile) { (Get-Content $regsFile -Raw | ConvertFrom-Json).Length } else { 0 } } catch { 0 }
            $recFile = Join-Path $Path "data\recruitments.json"
            $recCount = try { if (Test-Path $recFile) { (Get-Content $recFile -Raw | ConvertFrom-Json).Length } else { 0 } } catch { 0 }

            $resObj = [PSCustomObject]@{
                success = $true
                authenticated = $true
                totalViews = $tViews
                uniqueVisitors = $uVisitors
                registerClicks = $rClicks
                conversionRate = $rate
                ctaBreakdown = if ($stats) { $stats.ctaBreakdown } else { $null }
                recentEvents = if ($stats) { $stats.recentEvents } else { @() }
                registrationsCount = $regsCount
                recruitmentsCount = $recCount
                lastUpdated = if ($stats -and $stats.lastUpdated) { $stats.lastUpdated } else { (Get-Date).ToString("o") }
                serverTime = (Get-Date).ToString("o")
            }

            $resJson = $resObj | ConvertTo-Json -Depth 6
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($resJson)
            $response.ContentType = "application/json; charset=utf-8"
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.OutputStream.Flush()
            $response.OutputStream.Close()
            continue
        }

        if ($urlPath -eq "/api/analytics/reset" -and $request.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
            $bodyText = $reader.ReadToEnd()
            $payload = try { $bodyText | ConvertFrom-Json } catch { $null }
            $bodyPass = if ($payload) { $payload.password } else { $null }

            if (-not (Test-AdminPass $bodyPass)) {
                $resJson = [PSCustomObject]@{ success = $false; error = "Unauthorized" } | ConvertTo-Json
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($resJson)
                $response.ContentType = "application/json; charset=utf-8"
                $response.StatusCode = 401
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                $response.OutputStream.Flush()
                $response.OutputStream.Close()
                continue
            }

            $resetStats = [PSCustomObject]@{
                totalViews = 0
                uniqueVisitors = 0
                registerClicks = 0
                ctaBreakdown = [PSCustomObject]@{
                    navbar = 0; hero_cta = 0; spotlight_card = 0; events_list = 0; registration_page = 0; bottom_banner = 0; other = 0
                }
                visitorIds = @()
                recentEvents = @()
                lastUpdated = (Get-Date).ToString("o")
            }
            $resetStats | ConvertTo-Json -Depth 6 | Set-Content $analyticsPath -Encoding UTF8

            $resJson = [PSCustomObject]@{ success = $true; message = "Reset successful" } | ConvertTo-Json
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($resJson)
            $response.ContentType = "application/json; charset=utf-8"
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.OutputStream.Close()
            continue
        }

        if ($urlPath -eq "/" -or [string]::IsNullOrWhiteSpace($urlPath)) { 
            $urlPath = "/index.html" 
        }

        if ($urlPath -eq "/data" -or $urlPath -eq "/data/") {
            $filePath = Join-Path $Path "data.html"
        } elseif ($urlPath -eq "/registration" -or $urlPath -eq "/registration/") {
            $filePath = Join-Path $Path "registration.html"
        } else {
            $filePath = Join-Path $Path ($urlPath.TrimStart('/').Replace('/', '\'))

            if (Test-Path $filePath -PathType Container) {
                $candidateIndex = Join-Path $filePath "index.html"
                if (Test-Path $candidateIndex -PathType Leaf) {
                    $filePath = $candidateIndex
                }
            } elseif (-not (Test-Path $filePath -PathType Leaf)) {
                $candidateHtml = $filePath + ".html"
                if (Test-Path $candidateHtml -PathType Leaf) {
                    $filePath = $candidateHtml
                }
            }
        }

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = $mimeTypes[$ext]
            if (-not $mime) { $mime = "application/octet-stream" }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length

            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
            $response.StatusCode = 200
        } else {
            # Fallback to index.html for SPA paths
            $indexPath = Join-Path $Path "index.html"
            if (Test-Path $indexPath -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($indexPath)
                $response.ContentType = "text/html; charset=utf-8"
                $response.ContentLength64 = $bytes.Length
                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                }
                $response.StatusCode = 200
            } else {
                $response.StatusCode = 404
            }
        }
        $response.OutputStream.Flush()
        $response.OutputStream.Close()
    } catch {
        # Loop continues gracefully
    }
}
