@echo off
echo ============================
echo  Updating website...
echo ============================
echo.

git add .
git commit -m "update"
git push

echo.
echo ============================
echo  Done. Please wait a moment and check the site.
echo ============================
pause
