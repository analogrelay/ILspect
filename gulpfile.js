var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var path = require('path');

var spawn = require('child_process').spawn;

var tsProject = ts.createProject('front/src/tsconfig.json');

function exec(cmd, args, cwd, cb, shell_if_windows) {
    var proc = spawn(cmd, args, {
        stdio: "inherit",
        cwd: cwd,
        shell: shell_if_windows && process.platform === 'win32'
    });
    proc.on('exit', function(code) {
       if (code != 0) {
           cb(`build failed with exit code ${code}`);
       } else {
           cb();
       } 
    });
}

function copydep(mod, subpath) {
    gulp.src(`front/node_modules/${mod}/${subpath}`)
        .pipe(gulp.dest(`front/lib/${mod}`));
}

gulp.task('prepare:npm-front', function(cb) {
    exec("npm", [ "install" ], "./front", cb, true);
});

gulp.task('prepare:typings', function(cb) {
    exec("typings", [ "install" ], "./front/src", cb, true);
});

gulp.task('prepare:front', [ 'prepare:npm-front', 'prepare:typings' ]);

gulp.task('prepare:nuget', function(cb) {
    exec("dotnet", [ "restore" ], "./back", cb);
});

gulp.task('prepare:back', [ 'prepare:nuget' ]);

gulp.task('prepare', [ 'prepare:front', 'prepare:back' ]);

gulp.task('compile:typescript', function() {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    tsResult.js
        .pipe(rename(function(path) {
            if (path.dirname.startsWith('src/')) {
                path.dirname = path.dirname.substring(4);
            }
            else if (path.dirname.startsWith('src')) {
                path.dirname = path.dirname.substring(3);
            }
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('front/app'));
});

gulp.task('compile:javascript', function() {
    gulp.src("front/src/**/*.js")
        .pipe(gulp.dest("front/app"));
});

gulp.task('compile:sass', function() {
    return gulp.src("front/src/styles/master.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("front/app/styles")); 
});

gulp.task('compile:front', ['compile:typescript', 'compile:javascript', 'compile:sass']);

gulp.task('compile:back', function(cb) {
    exec("dotnet", [ "publish", `${__dirname}/back/src/ILspect.Server/project.json` ], undefined, cb);
});

gulp.task('compile', [ 'compile:front', 'compile:back']);

gulp.task('copydeps:systemjs', function() {
    copydep("systemjs", "dist/system{,.src}.js{,.map}");
});

gulp.task('copydeps:redux', function() {
    copydep("redux", "dist/redux{.js,.min.js}");
});

gulp.task('copydeps:redux-thunk', function() {
    copydep("redux-thunk", "dist/redux-thunk{.js,.min.js}");
});

gulp.task('copydeps:react-redux', function() {
    copydep("react-redux", "dist/react-redux{.js,.min.js}");
});

gulp.task('copydeps:react', function() {
    copydep("react", "dist/react{.js,.min.js}");
});

gulp.task('copydeps:react-dom', function() {
    copydep("react-dom", "dist/react-dom{.js,.min.js}");
});

gulp.task('copydeps:fetch', function() {
    copydep("whatwg-fetch", "fetch.js");
});

gulp.task('copydeps:bootstrap', function() {
    copydep("bootstrap", "dist/*/*"); 
});

gulp.task('copydeps:immutable', function() {
    copydep("immutable", "dist/immutable{.js,.min.js}"); 
});

gulp.task('copydeps', ['copydeps:systemjs', 'copydeps:redux', 'copydeps:redux-thunk', 'copydeps:react-redux', 'copydeps:react', 'copydeps:react-dom', 'copydeps:fetch', 'copydeps:bootstrap', 'copydeps:immutable']);

gulp.task('build', ['prepare', 'compile', 'copydeps']);
gulp.task('build:front', ['prepare:front', 'compile:front', 'copydeps']);
gulp.task('build:back', ['prepare:back', 'compile:back']);

gulp.task('default', ['build']);

gulp.task('run', ['compile:front'], function() {
    spawn("electron", [ __dirname + "/main.js" ], {
        stdio: 'inherit',
        shell: process.platform === 'win32'
    });
})

gulp.task('run:back', ['prepare:back', 'compile:back'], function(cb) {
    var p = path.join(__dirname, "/back/src/ILspect.Server/bin/Debug/netcoreapp1.0/publish/ILspect.Server.dll");
    exec("dotnet", [ p ], ".", cb);
});
