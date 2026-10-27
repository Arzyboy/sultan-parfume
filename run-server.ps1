$nodePath = 'C:\Users\rifki\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$port = 8787
$listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if ($listener) {
  Write-Host "Sultan Parfume sudah berjalan di http://localhost:$port" -ForegroundColor Green
  exit 0
}
if (-not (Test-Path $nodePath)) { Write-Host 'Node runtime tidak ditemukan.' -ForegroundColor Red; exit 1 }
Write-Host "Menjalankan Sultan Parfume di http://localhost:$port" -ForegroundColor Green
& $nodePath (Join-Path $PSScriptRoot 'server.js')

