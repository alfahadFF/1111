@echo off
setlocal
if "%~1"=="" (
  echo Usage: switch-offline-host.bat ^<host-ip^>
  echo Example: switch-offline-host.bat 192.168.137.1
  pause
  exit /b 1
)
set "HOST_IP=%~1"
echo Opening alfaprosys on local host %HOST_IP%...
start "alfaprosys local" "http://%HOST_IP%:3030/"
endlocal
