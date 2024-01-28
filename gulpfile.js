const gulp = require('gulp');
const browser = require("browser-sync");
const connectPhp = require( "gulp-connect-php" );

//Auto Reload
gulp.task('server', ()=> {
  connectPhp.server({
        livereload: true,
    port:80,
    base:'./src/'
  }, function (){
        browser.init({
      proxy: 'http://crud.host:80', // local domain
    });
  });
});

//HTML task
gulp.task('html', ()=> {
  return gulp.src(['./src/**/*.html'])
  .pipe(browser.reload({stream:true}))
});

//php task
gulp.task('php', ()=> {
  return gulp.src(['./src/**/*.php'])
  .pipe(browser.reload({stream:true}))
});

//js task
gulp.task('js', ()=> {
  return gulp.src(['./src/**/*.js'])
  .pipe(browser.reload({stream:true}))
});

// watch
gulp.task('watch', function(done) {
  gulp.watch( './src/**/*.html', gulp.task('html') );
  gulp.watch( './src/**/*.php', gulp.task('php') );
  gulp.watch( './src/**/*.js', gulp.task('js') );
});

// default
gulp.task('default', gulp.series(gulp.parallel('watch','server')));
