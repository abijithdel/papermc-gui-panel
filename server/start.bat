@echo off
cd /d %cd%\server
java -Xms2048M -Xmx2048M -jar server.jar nogui
pause
