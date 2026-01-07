# check-links.ps1 - Checks for broken file links in markdown files
# Run manually or as a git pre-commit hook

param(
    [switch]$Fix,
    [switch]$Verbose
)

$ErrorActionPreference = "Continue"
$projectRoot = git rev-parse --show-toplevel 2>$null
if (-not $projectRoot) { $projectRoot = Get-Location }

Write-Host "Checking for broken file links in markdown files..." -ForegroundColor Cyan
Write-Host "Project root: $projectRoot" -ForegroundColor Gray

$brokenLinks = @()
$checkedFiles = 0

# Find all markdown files
Get-ChildItem -Path $projectRoot -Filter "*.md" -Recurse | Where-Object { $_.FullName -notlike "*\.git\*" } | ForEach-Object {
    $file = $_
    $checkedFiles++
    
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if (-not $content) { return }
    
    # Find file:/// links
    $matches = [regex]::Matches($content, 'file:///([^)\s"'']+)')
    
    foreach ($match in $matches) {
        $filePath = $match.Groups[1].Value
        # Convert URL encoding
        $filePath = [System.Uri]::UnescapeDataString($filePath)
        # Handle Windows paths
        $filePath = $filePath -replace '/', '\'
        
        if (-not (Test-Path $filePath)) {
            $brokenLinks += [PSCustomObject]@{
                SourceFile = $file.FullName
                BrokenLink = $match.Value
                ExpectedPath = $filePath
            }
            
            if ($Verbose) {
                Write-Host "  BROKEN in $($file.Name): $filePath" -ForegroundColor Red
            }
        }
    }
    
    # Also check relative markdown links like [text](./path/to/file.md)
    $relativeMatches = [regex]::Matches($content, '\[([^\]]+)\]\((?!http|file|#)([^)]+\.md)\)')
    
    foreach ($match in $relativeMatches) {
        $relativePath = $match.Groups[2].Value
        $absolutePath = Join-Path $file.DirectoryName $relativePath
        
        if (-not (Test-Path $absolutePath)) {
            $brokenLinks += [PSCustomObject]@{
                SourceFile = $file.FullName
                BrokenLink = $relativePath
                ExpectedPath = $absolutePath
            }
            
            if ($Verbose) {
                Write-Host "  BROKEN in $($file.Name): $relativePath" -ForegroundColor Red
            }
        }
    }
}

Write-Host ""
Write-Host "Checked $checkedFiles markdown files." -ForegroundColor Gray

if ($brokenLinks.Count -eq 0) {
    Write-Host "All file links are valid!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "Found $($brokenLinks.Count) broken link(s):" -ForegroundColor Yellow
    Write-Host ""
    
    $brokenLinks | Group-Object SourceFile | ForEach-Object {
        Write-Host $_.Name -ForegroundColor White
        $_.Group | ForEach-Object {
            Write-Host "  -> $($_.BrokenLink)" -ForegroundColor Red
        }
    }
    
    exit 1
}
