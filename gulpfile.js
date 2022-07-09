var gulp = require('gulp')
const {src, dest, parallel, series, watch} = require('gulp')

var markdown = require('gulp-markdown')
const browserSync = require('browser-sync').create()
const fileinclude = require('gulp-file-include')
const sass = require('gulp-sass')
const notify = require('gulp-notify')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber') // модуль для отслеживания ошибок
const rigger = require('gulp-rigger') // модуль для импорта содержимого одного файла в другой
const del = require('del')
const cache = require('gulp-cache') // модуль для кэширования
const imagemin = require('gulp-imagemin') // плагин для сжатия PNG, JPEG, GIF и SVG изображений
const jpegrecompress = require('imagemin-jpeg-recompress') // плагин для сжатия jpeg
const pngquant = require('imagemin-pngquant') // плагин для сжатия png
const uglify = require('gulp-uglify-es').default

var path = {
    production: {
        html: process.env.ENV ? process.env.PRODUCT_PATH + '' : 'build/',
        js: process.env.ENV ? process.env.PRODUCT_PATH + 'js/' : 'build/js/',
        css: process.env.ENV ? process.env.PRODUCT_PATH + 'css/' : 'build/css/',
        images: process.env.ENV ? process.env.PRODUCT_PATH + 'images/' : 'build/images/',
        fonts: process.env.ENV ? process.env.PRODUCT_PATH + 'fonts/' : 'build/fonts/',
        resources: process.env.ENV ? process.env.PRODUCT_PATH + 'resources/' : 'build/resources/',
    },
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        images: 'build/images/',
        svg: 'build/svg/',
        fonts: 'build/fonts/',
        resources: 'build/resources/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        images: 'src/images/**/*.*',
        svg: 'src/svg/**/*.svg',
        fonts: 'src/fonts/**/*.*',
        resources: 'src/resources/'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/style/**/*.css',
        //css: 'assets/src/style/**/*.scss',
        images: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*',
        resources: 'src/resources/**/*.*'
    },
    clean: './assets/build/*'
}

const markdownFiles = () => {
    del(['src/html/dist/*'])

    return gulp.src('src/md/**/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('src/html/dist'))
}

const styles = () => {
    return src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', notify.onError()))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCSS({
            level: 1
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream())
}

const scripts = () => {
    return src(path.src.js) // получим файл main.js
        .pipe(plumber()) // для отслеживания ошибок
        .pipe(rigger()) // импортируем все указанные файлы в main.js
        .pipe(dest(path.build.js))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.init()) //инициализируем sourcemap
        //.pipe(uglify()) // минимизируем js
        .pipe(sourcemaps.write('./')) //  записываем sourcemap
        .pipe(dest(path.build.js)) // положим готовый файл
        //.pipe(webserver.reload({ stream: true })); // перезагрузим сервер
        .pipe(browserSync.stream()) // перезагрузим сервер
}

const images = () => {
    return src(path.src.images) // путь с исходниками картинок
        .pipe(cache(imagemin([ // сжатие изображений
            imagemin.gifsicle({interlaced: true}),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            imagemin.svgo({plugins: [{removeViewBox: false}]})
        ])))
        .pipe(dest(path.build.images)) // выгрузка готовых файлов

    return src(['./src/images/**.svg', './src/images/**.jpg', './src/images/**.png', './src/images/**.jpeg'])
        .pipe(dest('./build/images'))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    })

    watch('./src/scss/**/*.scss', styles)

    // Сперва собирам md файлы
    watch('./src/md/**/*.md', markdownFiles)

    // Затем инклюд
    watch('./src/html/**/*.html', htmlInclude)

    watch('./src/images/**/*.jpg', images)
    watch('./src/images/**/*.png', images)
    watch('./src/images/**/*.jpeg', images)
    watch('./src/images/**/*.svg', images)
    watch('./src/js/**/*.js', scripts)
}

const htmlInclude = () => {
    return src(['./src/html/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream())
}

const test = () => {
    // Меняем путь сохранения файлов для продакшена
    console.log(path)
}
exports.test = test

const cleanBuild = () => {
    // Меняем путь сохранения файлов для продакшена
    if (process.env.PRODUCT_PATH) {
        path.build = path.production
    }

    // Удаляем все что было в папке
    return del([path.build.html + 'css/*'], {force: true})
}



const tinypng = () => {
    return src(path.src.images) // путь с исходниками картинок
        .pipe(cache(imagemin([ // сжатие изображений
            imagemin.gifsicle({interlaced: true}),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            imagemin.svgo({plugins: [{removeViewBox: false}]})
        ])))
        .pipe(dest(path.build.images)) // выгрузка готовых файлов
}

const stylesBuild = () => {
    return src('./src/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', notify.onError()))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCSS({
            level: 1
        }))
        .pipe(dest(path.build.css))
}

const scriptsBuild = () => {
    return src(path.src.js) // получим файл main.js
        .pipe(plumber()) // для отслеживания ошибок
        .pipe(rigger()) // импортируем все указанные файлы в main.js
        .pipe(dest(path.build.js))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify()) // минимизируем js
        .pipe(dest(path.build.js)) // положим готовый файл
}


const imagesBuild = () => {
    return src(path.src.images) // путь с исходниками картинок
        .pipe(cache(imagemin([ // сжатие изображений
            imagemin.gifsicle({interlaced: true}),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            imagemin.svgo({plugins: [{removeViewBox: false}]})
        ])))
        .pipe(dest(path.build.images)) // выгрузка готовых файлов

    return src(['./src/images/**.svg', './src/images/**.jpg', './src/images/**.png', './src/images/**.jpeg'])
        .pipe(dest('./build/images'))
}

exports.watchFiles = watchFiles
exports.watch = watchFiles
exports.fileinclude = htmlInclude


exports.build = series(cleanBuild, parallel(htmlInclude, scriptsBuild, imagesBuild), stylesBuild)
