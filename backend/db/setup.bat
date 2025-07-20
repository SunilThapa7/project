@echo off
"C:\xampp\mysql\bin\mysql.exe" -u root < "%~dp0setup.sql"
pause 