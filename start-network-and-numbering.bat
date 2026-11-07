@echo off
setlocal

rem Starts the MyPOS hosted network and the local numbering service.
rem Run this file from Task Scheduler with "Run with highest privileges".
set "NUMBERING_SCRIPT=%~dp0tools\numbering-server.js"
set "NODE=%~dp0runtime\node.exe"
set "LOG=%~dp0mypos-network-numbering.log"

>>"%LOG%" echo.
>>"%LOG%" echo ==== MyPOS network and numbering %date% %time% ====

netsh wlan stop hostednetwork >>"%LOG%" 2>&1
netsh wlan set hostednetwork mode=allow ssid=MyPOS key=12345678 >>"%LOG%" 2>&1
if errorlevel 1 (
  >>"%LOG%" echo ERROR: hosted network configuration failed
  exit /b 10
)

netsh wlan start hostednetwork >>"%LOG%" 2>&1
if errorlevel 1 (
  >>"%LOG%" echo ERROR: hosted network start failed
  exit /b 11
)

timeout /t 3 /nobreak >nul

if not exist "%NUMBERING_SCRIPT%" (
  >>"%LOG%" echo ERROR: numbering script not found: %NUMBERING_SCRIPT%
  exit /b 12
)

if not exist "%NODE%" (
  >>"%LOG%" echo ERROR: bundled Node runtime not found: %NODE%
  exit /b 13
)

"%NODE%" "%NUMBERING_SCRIPT%" 8787 >>"%LOG%" 2>&1

exit /b %errorlevel%
