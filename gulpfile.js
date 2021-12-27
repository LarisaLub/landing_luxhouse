const {src, dest, series, watch}= require('gulp');
const sass       = require('gulp-sass');
const autoprefex = require('gulp-autoprefixer')
const concat     = require('gulp-concat');
const csso       = require('gulp-csso');
const include    = require('gulp-file-include')
const htmllmin   = require('gulp-htmlmin');
const del        = require('del');
const sync       = require('browser-sync').create();
const uglify     = require('gulp-uglify-es').default;
const  rename    = require("gulp-rename");
const imagemin   = require('gulp-imagemin');
const httpProxy = require('http-proxy');
const chalk = require('chalk');

async function html () {
    return src('app/assets/index.html')
    .pipe(include({
        prefix: '@@'
    }))
    .pipe(htmllmin({
        collapseWhitespace: true
    }))
    .pipe(dest('./dist'))
}

async function scss () {
    return src('app/assets/scss/main.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefex({
        //browsers: ['last 2 versions'],
        cascade: false,
    }))
    .pipe(csso())
    .pipe(concat('main.min.css'))
    .pipe(dest('./dist/css'));
}

async function js () {
    return src("app/assets/js/**.js")
        .pipe(rename("bundle.min.js"))
        .pipe(uglify(/* options */))
        .pipe(dest("./dist/js/"));
};

async function clear(){
    return del('./dist')
}


async function server(){
    sync.init({
        server: './dist',
        startPath: '/',
        port: 3003,
    })
    watch('app/assets/img/*', series(img)).on('change', sync.reload);
    watch('app/assets/components/*', series(html)).on('change', sync.reload);
    watch('app/assets/scss/**/*', series(scss)).on('change', sync.reload);
    watch('app/assets/js/*', series(js)).on('change', sync.reload);
}

async function img() {
    src('app/assets/img/*')
        .pipe(imagemin())
        .pipe(dest('./dist/img'))
}

exports.server = series(clear, img, scss, js, html, server);