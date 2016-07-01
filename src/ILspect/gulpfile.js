const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const spawn = require("child_process").spawn;
const path = require("path");

var uiRoot = path.join(__dirname, "ui");
var tsProject = ts.createProject(path.join(uiRoot, 'tsconfig.json'));

function exec(cmd, args, cwd, cb) {
    var proc = spawn(cmd, args, {
        stdio: "inherit",
        cwd: cwd,
        shell: process.platform === "win32"
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
    exec('typings', ['install'], uiRoot, function(err, stdout, stderr) {
        cb(err);
    });
});

gulp.task('prepare:jspm', function(cb) {
    exec('jspm', ['install'], uiRoot, function(err, stdout, stderr) {
        cb(err);
    });
});

gulp.task('prepare:npm', function(cb) {
    exec('npm', ['install'], uiRoot, function(err, stdout, stderr) {
        cb(err);
    });
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
        .pipe(gulp.dest('bin/ui'));
});

// Copy files from src to dist that don't get compiled
gulp.task('copysrc', function() {
    gulp.src([uiRoot + '/src/**/*.{html,js}'])
        .pipe(gulp.dest('dist/src'));
    gulp.src([uiRoot + '/jspm_packages/**'])
        .pipe(gulp.dest('dist/jspm_packages'));
    gulp.src([uiRoot + '/package.json', uiRoot + '/config.js', uiRoot + '/index.html'])
        .pipe(gulp.dest('dist'));
})

gulp.task('compile', [ 'compile:typescript', 'copysrc' ]);

gulp.task('run', [ 'compile' ], function(cb) {
    exec('electron electron/main.js', function(err, stdout, stderr) {
        cb(err);
    });
});

gulp.task('default', [ 'compile' ]);
