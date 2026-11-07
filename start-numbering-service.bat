@echo off
setlocal
cd /d "%~dp0"
set "PORT=8787"
if not "%~1"=="" set "PORT=%~1"
if not exist "runtime\node.exe" (
  echo runtime\node.exe not found.
  pause
  exit /b 1
)
echo Starting local invoice numbering service on port %PORT%...
echo Keep this window open while using alfaprosys.
"runtime\node.exe" "tools\numbering-server.js" %PORT%
if errorlevel 1 pause
endlocal
