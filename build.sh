echo 'Don’t run this script. Run the commands individually instead.'
exit;

npm start &

# Run file watcher to automatically compile sass to css
sass --watch assets/sass/style.scss:assets/css/style.css --style=compressed &

browser-sync start --files="assets/css/style.css,**/*.js,*.php,**/*.php" --open=external --proxy=https://bridge-st-olaf-carleton-library.test --host=$(hostname) &
