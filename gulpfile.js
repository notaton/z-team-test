var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  rigger = require('gulp-rigger'),
  cssmin = require('gulp-clean-css'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  rimraf = require('rimraf'),
  browserSync = require("browser-sync"),
  pug = require('gulp-pug'),
  notify = require("gulp-notify"),
  plumber = require('gulp-plumber'),
  changed = require('gulp-changed'),
  iconfont = require('gulp-iconfont'),
  iconfontCss = require('gulp-iconfont-css'),
  iconfontTemplate = require('gulp-iconfont-template'),
  reload = browserSync.reload;

var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  src: {
    html: 'src/*.pug',
    js: 'src/js/*.js',
    style: 'src/style/*.scss',
    img: 'src/img/**/*.+(jpg|png|svg)',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    html: 'src/**/*.pug',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.scss',
    img: 'src/img/**/*.+(jpg|png|svg)',
    fonts: 'src/fonts/**/*.*',
    icons: 'src/icons/*.svg'
  },
  clean: './build'
};

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "Frontend_Devil"
};

var fontName = 'icon-font',
    fontPath = '../fonts/' + fontName + '/';
 
gulp.task('iconfont:build', function(){
  gulp.src(['src/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: 'src/style/_icon-template.scss',
      targetPath: '../../style/_icons.scss',
      fontPath: fontPath
    }))
    .pipe(iconfont({
      fontName: fontName,
      prependUnicode: true,
      normalize: true,
      centerHorizontally: true,
      fontHeight: 1001
     }))
    .pipe(gulp.dest('src/fonts/' + fontName));
});

gulp.task('html:build', function () {
  gulp.src(path.src.html) //Выберем файлы по нужному пути
    .pipe(pug({
        pretty: true 
    }).on("error", notify.onError("Error in PUG: <%= error.message %>")))
    .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
    .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
  gulp.src(path.src.js) //Найдем наш main файл
    .pipe(plumber({errorHandler: notify.onError("Error in JS: <%= error.message %>")}))
    .pipe(rigger()) //Прогоним через rigger
    .pipe(sourcemaps.init()) //Инициализируем sourcemap
    .pipe(uglify()) //Сожмем наш js
    .pipe(sourcemaps.write()) //Пропишем карты
    .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
    .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('style:build', function () {
  gulp.src(path.src.style) //Выберем наш main.scss
  .pipe(sourcemaps.init()) //То же самое что и с js
    .pipe(sass().on("error", notify.onError("Error in SCSS: <%= error.message %>"))) //Скомпилируем
    .pipe(prefixer()) //Добавим вендорные префиксы
    .pipe(cssmin()) //Сожмем
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css)) //И в build
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img) //Выберем наши картинки
    .pipe(changed(path.build.img))
    .pipe(imagemin({ //Сожмем их
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img)) //И бросим в build
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build',
  'iconfont:build'
]);

gulp.task('watch', function () {
  watch([path.watch.html], function (event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function (event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function (event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function (event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], function (event, cb) {
    gulp.start('fonts:build');
  });
  watch([path.watch.icons], function (event, cb) {
    gulp.start('iconfont:build');
  });
});

gulp.task('webserver', function () {
  browserSync({
    server: {
      baseDir: 'build'
    },
    notify: false,
    open: false,
    reloadOnRestart: true
  });
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);