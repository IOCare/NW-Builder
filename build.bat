@echo off

set CUR_DIR="%CD%"
SET APP_RELEASE=%~nx1%-release
set EXE_PATH=%CUR_DIR%\%APP_RELEASE%\%~nx1%.exe
set ICO_PATH=%1\app.ico
set NWEXE_PATH=%CUR_DIR%\buildTools\nw\nw.exe
set NWZIP_PATH=%CUR_DIR%\%APP_RELEASE%\app.nw

SETLOCAL EnableDelayedExpansion
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set "DEL=%%a"
)

call :ColorText 0C "nodebob v0.1"
echo.
call :ColorText 0C "---"
echo.
echo.

if not exist %APP_RELEASE% md %APP_RELEASE%

echo.
call :ColorText 0a "Creating app package..."
cd buildTools\7z
7z a -r -tzip %NWZIP_PATH% %1%\*
cd ..\..

echo.
call :ColorText 0a "Creating executable..."
echo.
copy /b /y %NWEXE_PATH% %EXE_PATH%
cd buildTools\ar
if exist %ICO_PATH% Resourcer -op:upd -src:%EXE_PATH% -type:14 -name:IDR_MAINFRAME -file:%ICO_PATH%
copy /b /y %EXE_PATH% + %NWZIP_PATH% %EXE_PATH%
cd ..\..

echo.
call :ColorText 0a "Copying files..."
echo.
if not exist %CUR_DIR%\%APP_RELEASE%\ffmpegsumo.dll copy %CUR_DIR%\buildTools\nw\ffmpegsumo.dll %CUR_DIR%\%APP_RELEASE%\ffmpegsumo.dll
if not exist %CUR_DIR%\%APP_RELEASE%\icudt.dll copy %CUR_DIR%\buildTools\nw\icudt.dll %CUR_DIR%\%APP_RELEASE%\icudt.dll
if not exist %CUR_DIR%\%APP_RELEASE%\libEGL.dll copy %CUR_DIR%\buildTools\nw\libEGL.dll %CUR_DIR%\%APP_RELEASE%\libEGL.dll
if not exist %CUR_DIR%\%APP_RELEASE%\libGLESv2.dll copy %CUR_DIR%\buildTools\nw\libGLESv2.dll %CUR_DIR%\%APP_RELEASE%\libGLESv2.dll
if not exist %CUR_DIR%\%APP_RELEASE%\nw.pak copy %CUR_DIR%\buildTools\nw\nw.pak %CUR_DIR%\%APP_RELEASE%\nw.pak

echo.
call :ColorText 0a "Deleting temporary files..."
echo.
del %NWZIP_PATH%

echo.
call :ColorText 0a "Done!"
echo.
goto :eof


:ColorText
echo off
<nul set /p ".=%DEL%" > "%~2"
findstr /v /a:%1 /R "^$" "%~2" nul
del "%~2" > nul 2>&1
goto :eof
