const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const filter = require('gulp-filter');
const del = require('del');

const path = require('path');

const spawn = require('child_process').spawn;

const tsProject = ts.createProject('src/ILspect.App/tsconfig.json');

const uiStartScript = path.join(__dirname, "src/ILspect.App/electron/app.js");
const serverExecutable = path.join(__dirname, "src/ILspect.Server/bin/Debug/netcoreapp1.0/publish/ILspect.Server.dll");

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
    gulp.src(`src/ILspect.App/node_modules/${mod}/${subpath}`)
        .pipe(gulp.dest(`src/ILspect.App/dist/lib/${mod}`));
}

gulp.task('clean:front', function() {
    return del([
        'src/ILspect.App/dist'
    ]);
});

gulp.task('clean:back', function() {
    return del([
        'src/ILspect.Server/bin',
        'src/ILspect.Server/obj'
    ])
});

gulp.task('clean', ['clean:front', 'clean:back']);

gulp.task('prepare:npm-front', function(cb) {
    exec("npm", [ "install" ], "./src/ILspect.App", cb, true);
});

gulp.task('prepare:typings', function(cb) {
    exec("typings", [ "install" ], "./src/ILspect.App", cb, true);
});

gulp.task('prepare:front', [ 'prepare:npm-front', 'prepare:typings' ]);

gulp.task('prepare:nuget', function(cb) {
    exec("dotnet", [ "restore" ], "./src/ILspect.Server", cb);
});

gulp.task('prepare:back', [ 'prepare:nuget' ]);

gulp.task('prepare', [ 'prepare:front', 'prepare:back' ]);

gulp.task('compile:typescript', function() {
    var tsResult = tsProject.src()
        .pipe(filter(['src/**']))
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/ILspect.App/dist'));
});

gulp.task('compile:other', function() {
    gulp.src([
            "./src/ILspect.App/src/**",
            "!**/*.{ts,tsx,scss,json}"
        ])
        .pipe(gulp.dest("./src/ILspect.App/dist"));
});

gulp.task('compile:sass', function() {
    return gulp.src("./src/ILspect.App/src/styles/master.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./src/ILspect.App/dist/styles/")); 
});

gulp.task('compile:front', ['compile:typescript', 'compile:other', 'compile:sass']);

gulp.task('compile:back', function(cb) {
    exec("dotnet", [ "publish", `${__dirname}/src/ILspect.Server/project.json` ], undefined, cb);
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

gulp.task('run', ['copydeps', 'compile:front'], function() {
    var electronArgs = [ 
        uiStartScript, 
        serverExecutable ];
        
    spawn("electron", electronArgs, {
        stdio: 'inherit',
        shell: process.platform === 'win32'
    });
})

gulp.task('run:back', ['prepare:back', 'compile:back'], function(cb) {
    exec("dotnet", [ serverExecutable ], ".", cb);
});
