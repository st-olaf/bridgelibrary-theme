// webpack.mix.js
let mix = require('laravel-mix');

mix.sass('src/scss/bridge-library-theme.scss', 'assets/css');
mix.js('src/js/bridge-library-theme.js', 'assets/js');
