const gulp = require('gulp');
const browser = require("browser-sync");
const connectPhp = require( "gulp-connect-php" );

//オートリロードのタスク
gulp.task('server', ()=> {
  connectPhp.server({
        livereload: true,
    port:80,
    base:'./src/'
  }, function (){
        browser.init({
      proxy: 'http://mysql.host:80',
    });
  });
});

//HTMLのタスク
gulp.task('html', ()=> {
  return gulp.src(['./app/**/*.html'])
  .pipe(browser.reload({stream:true}))
});

//phpのタスク
gulp.task('php', ()=> {
  return gulp.src(['./app/**/*.php'])
  .pipe(browser.reload({stream:true}))
});

//jsのタスク
gulp.task('js', ()=> {
  return gulp.src(['./app/**/*.js'])
  .pipe(browser.reload({stream:true}))
});

// 監視
gulp.task( 'watch', function(done) {
  gulp.watch( './app/**/*.html', gulp.task('html') );
  gulp.watch( './app/**/*.php', gulp.task('php') );
  gulp.watch( './app/**/*.js', gulp.task('js') );
});

// default
gulp.task('default', gulp.series(gulp.parallel('watch','server')));
