const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const exec = require('child_process').exec;

var tsProject = ts.createProject('tsconfig.json');

gulp.task('compile:typescript', function() {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .once("error", function() {
            this.once("finish", function() { process.exit(1); });
        });
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src'));
});

gulp.task('compile', [ 'compile:typescript' ]);

gulp.task('run', [ 'compile' ], function(cb) {
    exec('electron electron/main.js', function(err, stdout, stderr) {
        cb(err);
    });
});

gulp.task('default', [ 'compile' ]);