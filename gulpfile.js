const gulp = require('gulp');
const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

// Caminhos dos arquivos
const paths = {
    pug: {
        src: 'src/views/**/*.pug',
        dest: 'dist/'
    },
    sass: {
        src: 'src/styles/**/*.scss',
        dest: 'dist/styles/'
    },
    js: {
        src: 'src/views/**/*.js',
        dest: 'dist/js/'
    },
    exjs: {
        src: 'src/scriptExternal/**/*.js',
        dest: 'dist/external/'
    },
    excss: {
        src: 'src/scriptExternal/**/*.css',
        dest: 'dist/external/'
    },
};

// Tarefa para compilar Pug
gulp.task('pug', () => 
    gulp.src(paths.pug.src)
        .pipe(pug())
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest(paths.pug.dest))
);

// Tarefa para compilar Sass
gulp.task('sass', function () {
    return gulp.src(paths.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.sass.dest));
});

// Tarefa para compilar JavaScript
gulp.task('js', function () {
    return gulp.src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.js.dest));
});

// Tarefa para compilar Scripts e bibliotecas extenas
gulp.task('exjs', function () {
    return gulp.src(paths.exjs.src)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.exjs.dest));
});

gulp.task('excss', function () {
    return gulp.src(paths.excss.src)
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.excss.dest));
});

// Tarefa padrão para rodar todas as tarefas
gulp.task('default', gulp.series('pug', 'sass', 'js', 'exjs', 'excss'));

// Tarefa para observar mudanças nos arquivos
gulp.task('watch', function () {
    gulp.watch(paths.pug.src, gulp.series('pug'));
    gulp.watch(paths.sass.src, gulp.series('sass'));
    gulp.watch(paths.js.src, gulp.series('js'));
    gulp.watch(paths.exjs.src, gulp.series('exjs'));
    gulp.watch(paths.excss.src, gulp.series('excss'));
});
