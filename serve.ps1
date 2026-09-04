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
        $response.AddHeader("Cache-Control", "no-cache")

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or [string]::IsNullOrWhiteSpace($urlPath)) { 
            $urlPath = "/index.html" 
        }

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
