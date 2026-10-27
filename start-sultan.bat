@echo off
set "NODE_PATH=C:\Users\rifki\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
cd /d "%~dp0"
start "Sultan Parfume Server" "%NODE_PATH%" server.js
ping 127.0.0.1 -n 2 >nul
start "" http://localhost:8787/
