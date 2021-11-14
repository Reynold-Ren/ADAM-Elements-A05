const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');

const { options } = require('./options');

// production || development
// # gulp --env production

gulp.task('clean', () => {
  return gulp
    .src(['./.tmp'], { read: false, allowEmpty: true }) // 選項讀取：false 阻止 gulp 讀取文件的內容，使此任務更快。
    .pipe($.clean());
});
// 當從 ['./public/**/*', './.tmp']陣列 換成 ['./.tmp', './public/**/*']
// 就可以重覆一直刷 gulp build 不跳錯誤

gulp.task('html', () => {
  return gulp
    .src(['./source/**/**.html'])
    .pipe(gulp.dest('./public'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task('babel', () => {
  return gulp
    .src(['./source/js/**/*.js'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.concat('all.js'))
    .pipe(
      $.babel({
        presets: ['es2015'],
      })
    )
    .pipe(
      $.if(
        options.env === 'production',
        $.uglify({
          compress: {
            drop_console: true,
          },
        })
      )
    )
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/Scripts/'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task('sass', function () {
  // PostCSS AutoPrefixer
  var plugins = [autoprefixer({ browsers: ['last 5 version', '> 5%', 'ie 8'] })];
  return gulp
    .src('./source/sass/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss(plugins))
    .pipe($.if(options.env === 'production', $.cleanCss()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/Styles'))
    .pipe(browserSync.stream())
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

// 錯誤：Did you forget to signal async completion
// 由於這個任務沒有辦法明確知道什麼時候全部完成，因此解法有以下幾種
// 1. 加入 callback function
// 2. 轉為 async function
// 3. 加入 return
// 4. 使用 promise

// 列出其中兩種簡單的方式
// 1. 加入 callback function
// gulp.task('imageMin', function(done) {
//   gulp
//     .src('./source/images/*')
//     .pipe($.if(options.env === 'production', $.imagemin()))
//     .pipe(gulp.dest('./public/images'));
//   done();
// });

// 2. 轉為 async function，讓 gulp 以同步方式處理
gulp.task('imageMin', async function () {
  gulp
    .src('./source/images/**/*')
    .pipe($.if(options.env === 'production', $.imagemin()))
    .pipe(gulp.dest('./public/images'));
});

gulp.task('ejs', async function () {
  gulp
    .src(['./source/**/*.ejs', './source/**/*.html'])
    .pipe($.frontMatter())
    .pipe(
      $.layout((file) => {
        return file.frontMatter;
      })
    )
    .pipe(gulp.dest('./public'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task('deploy', function () {
  return gulp.src('./public/**/*').pipe($.ghPages());
});

// gulp.task('sequence', gulpSequence('clean', 'jade', 'sass', 'babel', 'vendorJs', 'imageMin'));

// series() and parallel()
// series() 依序執行，必須一個執行完才能執行下一個
// parallel() 平行執行，可同時多個任務

gulp.task(
  'default',
  gulp.parallel('ejs', 'sass', 'babel', 'imageMin', function (done) {
    gulp.watch(['./source/sass/**/*.scss'], gulp.series('sass'));
    gulp.watch(['./source/**/*.ejs', './source/**/*.html'], gulp.series('ejs'));
    gulp.watch(['./source/javascripts/**/*.js'], gulp.series('babel'));

    browserSync.init({
      server: { baseDir: './public' },
      reloadDebounce: 2000,
    });

    done();
  })
);

gulp.task('build', gulp.series('clean', gulp.parallel('html', 'sass', 'babel'), gulp.series('imageMin')));
