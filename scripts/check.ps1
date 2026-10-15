# Run offline checks from any directory.
$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path $PSScriptRoot -Parent
python "$repoRoot/scripts/public-check.py"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
node "$repoRoot/scripts/validate-protocol.mjs" $repoRoot
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
$fixtures = @(Get-ChildItem "$repoRoot/scripts/tests/*.test.mjs" | ForEach-Object { $_.FullName })
node --test @fixtures
exit $LASTEXITCODE
