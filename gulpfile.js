var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var spawn = require('child_process').spawn;

var tsProject = ts.createProject('front/tsconfig.json');

gulp.task('compile:typescript', function() {
    var tsResult = gulp.src("front/src/**/*.ts{,x}")
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('front/app'));
});

gulp.task('compile:javascript', function() {
    gulp.src("front/src/**/*.js")
        .pipe(gulp.dest("front/app"));
});

gulp.task('compile:server', function(cb) {
    var proc = spawn("dotnet", [ "publish", `${__dirname}/back/src/Xildasm.Server/project.json` ], {
        stdio: "inherit"
    });
    proc.on('exit', function(code) {
       if (code != 0) {
           cb(`build failed with exit code ${code}`);
       } else {
           cb();
       } 
    });
});

gulp.task('compile', ['compile:typescript', 'compile:server', 'compile:javascript']);

gulp.task('copydeps:systemjs', function() {
    gulp.src("front/bower_components/system.js/dist/system{,.src}.js{,.map}")
        .pipe(gulp.dest('front/lib/system.js')); 
});

gulp.task('copydeps:react', function() {
    gulp.src("front/bower_components/react/react{,-dom}{,.min}.js")
        .pipe(gulp.dest('front/lib/react')); 
});

gulp.task('copydeps', ['copydeps:systemjs', 'copydeps:react']);

gulp.task('default', ['compile', 'copydeps']);