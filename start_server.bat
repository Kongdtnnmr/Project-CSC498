@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
echo Starting Development Server...
echo Please leave this window OPEN while using the website.
echo.
call "C:\Program Files\nodejs\npm.cmd" run dev
pause
