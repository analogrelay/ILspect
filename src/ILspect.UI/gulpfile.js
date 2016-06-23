const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const spawn = require("child_process").spawn;

var tsProject = ts.createProject('tsconfig.json');

function exec(cmd, args, cb, shell_if_windows) {
    var proc = spawn(cmd, args, {
        stdio: "inherit",
        cwd: __dirname,
        shell: shell_if_windows && process.platform === "win32"
    });
    proc.on("exit", function (code) {
        if (code !== 0) {
            cb(`build failed with exit code ${code}`);
        } else {
            cb();
        }
    });
}

gulp.task('prepare:typings', function(cb) {
    exec('typings', ['install'], function(err, stdout, stderr) {
        cb(err);
    }, true)
});

gulp.task('prepare:jspm', function(cb) {
    exec('jspm', ['install'], function(err, stdout, stderr) {
        cb(err);
    }, true)
});

gulp.task('prepare:npm', function(cb) {
    exec('npm', ['install'], function(err, stdout, stderr) {
        cb(err);
    }, true)
});

gulp.task('prepare', [ 'prepare:typings', 'prepare:jspm', 'prepare:npm' ]);

gulp.task('compile:typescript', function() {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .once("error", function() {
            this.once("finish", function() { process.exit(1); });
        });
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/src'));
});

// Copy files from src to dist that don't get compiled
gulp.task('copysrc', function() {
    gulp.src(['src/**/*.{html,js}'])
        .pipe(gulp.dest('dist/src'));
    gulp.src(['jspm_packages/**'])
        .pipe(gulp.dest('dist/jspm_packages'));
    gulp.src(['package.json', 'config.js', 'index.html'])
        .pipe(gulp.dest('dist'));
})

gulp.task('compile', [ 'compile:typescript', 'copysrc' ]);

gulp.task('run', [ 'compile' ], function(cb) {
    exec('electron electron/main.js', function(err, stdout, stderr) {
        cb(err);
    });
});

gulp.task('default', [ 'compile' ]);