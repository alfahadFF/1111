@echo off
setlocal
cd /d "%~dp0"
if "%PORT%"=="" set PORT=3030
if "%ALFA_NODE_NAME%"=="" set ALFA_NODE_NAME=%COMPUTERNAME%
if not "%~1"=="" set ALFA_PEER_URL=http://%~1:%PORT%
echo Starting alfaprosys local-first server on port %PORT%...
echo Node: %ALFA_NODE_NAME%
if defined ALFA_PEER_URL echo Standby replication target: %ALFA_PEER_URL%
echo Open on this computer: http://localhost:%PORT%/
echo Open from another device using this computer's IPv4 address from ipconfig.
echo Keep this window open during work.
runtime\node.exe offline_server.js %PORT%
if errorlevel 1 pause
endlocal
