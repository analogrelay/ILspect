var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

var spawn = require('child_process').spawn;

var tsProject = ts.createProject('front/src/tsconfig.json');

function exec(cmd, args, cwd, cb) {
    var proc = spawn(cmd, args, {
        stdio: "inherit",
        cwd: cwd
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

gulp.task('prepare:nuget', function(cb) {
    exec("dotnet", [ "restore" ], "./back", cb);
});

gulp.task('prepare:npm', function(cb) {
    exec("npm", [ "install" ], ".", cb);
});

gulp.task('prepare:bower', function(cb) {
    exec("bower", [ "install" ], "./front", cb);
});

gulp.task('prepare:typings', function(cb) {
    exec("typings", [ "install" ], "./front", cb);
});

gulp.task('prepare', [ 'prepare:nuget', 'prepare:npm', 'prepare:bower', 'prepare:typings' ]);

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

gulp.task('compile:server', function(cb) {
    exec("dotnet", [ "publish", `${__dirname}/back/src/ILspect.Server/project.json` ], undefined, cb);
});

gulp.task('compile', ['compile:typescript', 'compile:server', 'compile:javascript']);

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

gulp.task('copydeps', ['copydeps:systemjs', 'copydeps:redux', 'copydeps:redux-thunk', 'copydeps:react-redux', 'copydeps:react', 'copydeps:react-dom', 'copydeps:fetch']);

gulp.task('build', ['prepare', 'compile', 'copydeps']);

gulp.task('default', ['build']);

gulp.task('run', function() {
    spawn("electron", [ __dirname + "/main.js" ], {
        stdio: 'inherit'
    });
})

gulp.task('run:back', ['prepare:nuget', 'compile:server'], function(cb) {
    exec("dotnet", [ "./back/src/Xildasm.Server/bin/Debug/netcoreapp1.0/publish/Xildasm.Server.dll" ], ".", cb);
});