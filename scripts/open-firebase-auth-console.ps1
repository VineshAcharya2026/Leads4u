$ErrorActionPreference = 'Stop'
$RepoRoot = Split-Path -Parent $PSScriptRoot
$ConfigPath = Join-Path $RepoRoot 'firebase-applet-config.json'
if (-not (Test-Path $ConfigPath)) {
  Write-Error "Missing $ConfigPath"
}
$config = Get-Content $ConfigPath -Raw | ConvertFrom-Json
$projectId = $config.projectId
if (-not $projectId) {
  Write-Error 'firebase-applet-config.json has no projectId'
}
$url = "https://console.firebase.google.com/project/$projectId/authentication"
Write-Host "Opening Firebase Authentication for project: $projectId"
Start-Process $url

if (Get-Command gcloud -ErrorAction SilentlyContinue) {
  Write-Host 'Attempting: gcloud services enable identitytoolkit.googleapis.com (optional; you still need Get started in the console if Auth was never enabled).'
  gcloud services enable identitytoolkit.googleapis.com --project $projectId
}
