/// <binding AfterBuild="compile" Clean="clean" ProjectOpened="prepare" />
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const filter = require("gulp-filter");
const del = require("del");
const typescript = require("typescript");

const path = require("path");

const spawn = require("child_process").spawn;

const tsProject = ts.createProject("Client/tsconfig.json", {
    typescript: typescript
});

const uiStartScript = path.join(__dirname, "wwwroot/electron/app.js");

function exec(cmd, args, cwd, cb, shell_if_windows) {
    var proc = spawn(cmd, args, {
        stdio: "inherit",
        cwd: cwd,
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

function copydep(mod, subpath) {
    return gulp.src(`node_modules/${mod}/${subpath}`)
        .pipe(gulp.dest(`wwwroot/lib/${mod}`));
}

gulp.task("clean", function () {
    return del([
        "wwwroot/**",
        "!wwwroot" // Keep the "wwwroot" directory itself around.
    ]);
});

gulp.task("compile:typescript", function () {
    var tsResult = tsProject.src()
        .pipe(filter(["Client/**"]))
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("wwwroot"));
});

gulp.task("compile:other", function () {
    return gulp.src([
            "Client/index.html",
            "Client/!(typings)/**",
            "!**/*.{ts,tsx,scss,json}"
    ]).pipe(gulp.dest("wwwroot"));
});

gulp.task("compile:sass", function () {
    return gulp.src("Client/styles/master.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("wwwroot/styles"));
});

gulp.task("copydeps", function () {
    return Promise.all([
        copydep("redux", "dist/redux{.js,.min.js}"),
        copydep("systemjs", "dist/system{,.src}.js{,.map}"),
        copydep("redux-thunk", "dist/redux-thunk{.js,.min.js}"),
        copydep("react-redux", "dist/react-redux{.js,.min.js}"),
        copydep("react", "dist/react{.js,.min.js}"),
        copydep("react-dom", "dist/react-dom{.js,.min.js}"),
        copydep("whatwg-fetch", "fetch.js"),
        copydep("bootstrap", "dist/*/*"),
        copydep("immutable", "dist/immutable{.js,.min.js}")
    ]);
});

gulp.task("compile", [ "copydeps", "compile:typescript", "compile:other", "compile:sass" ]);

gulp.task("default", [ "compile" ]);
