@echo off
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0activate-skills.ps1" %*
