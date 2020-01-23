const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const Path = require('path')
let generateSourceMaps = process.env.NODE_ENV !== 'production'

if (process.env.SOURCEMAPS === 'true' || process.env.SOURCEMAPS === '1') {
  generateSourceMaps = true
}

const sassPaths = ['./node_modules']

// const copyBootstrapScript = () => {
//   return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
//     .pipe(gulp.dest('Components/Themes/assets/js'))
// }

// const taskScript = () => {
//   return gulp.src(['./src/js/*.js'])
//     .pipe($.babel())
//     // .pipe($.rename(function (filepath) {
//     //   filepath.dirname = Path.join(filepath.dirname, '../../js')
//     // }))
//     .pipe(gulp.dest('./js'))
// }
// taskScript.displayName = 'script'

const taskSass = function () {
  return gulp.src(['./src/scss/xe_blockeditor/*.scss'])
    .pipe($.if(generateSourceMaps, $.sourcemaps.init()))
    .pipe($.plumber())
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: (generateSourceMaps) ? 'expanded' : 'compressed'
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer())
    // .pipe($.rename(function (filepath) {
    //   filepath.dirname = Path.join(filepath.dirname, '../../css')
    // }))
    .pipe($.if(generateSourceMaps, $.sourcemaps.write('.')))
    .pipe(gulp.dest('.'))
}
taskSass.displayName = 'sass'

const taskLintStyle = function () {
  return gulp.src(['./**/*.scss', '!node_modules/**'])
    .pipe($.plumber())
    .pipe($.stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
}
taskLintStyle.displayName = 'lint:style'

const taskFixStyle = function () {
  return gulp.src(['./**/*.scss', '!node_modules/**'])
    .pipe($.plumber())
    .pipe($.stylelint({
      fix: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
    .pipe(gulp.dest('./'))
}
taskFixStyle.displayName = 'lint:fix-style'
taskFixStyle.description = '.scss 자동 교정'

// const taskPosthtml = function () {
//   const options = {
//     root: './Components/Themes/markup/src'
//   }

//   const plugins = [
//     require('posthtml-extend')(options),
//     require('posthtml-include')(options)
//   ]

//   return gulp.src(['Components/Themes/markup/src/**/*.html', '!**/_*.html'])
//     .pipe($.posthtml(plugins))
//     .pipe(gulp.dest('Components/Themes/markup'))
// }
// taskPosthtml.displayName = 'posthtml'

const taskWatch = function () {
  gulp.watch(['./src/**/*.scss'], gulp.series(taskSass))
  // gulp.watch(['./src/js/*.js'], gulp.series(taskScript))
  // gulp.watch(['Components/Themes/markup/src/**/*.html'], gulp.series(taskPosthtml))
}

gulp.task('default', gulp.series(taskSass))
// gulp.task('build', gulp.series(taskLintStyle, taskSass, copyBootstrapScript, taskScript))
gulp.task('build', gulp.series(taskLintStyle, taskSass))
gulp.task('watch', taskWatch)

// gulp.task(taskScript)
gulp.task(taskSass)

// gulp.task(taskPosthtml)

gulp.task('lint', gulp.series(taskLintStyle))
gulp.task(taskLintStyle)
gulp.task(taskFixStyle)
