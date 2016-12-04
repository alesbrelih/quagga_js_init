const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const gutil = require("gutil");
const browserSync = require("browser-sync");


gulp.task("browserify",()=>{
    return browserify("./app.js")
    .bundle()
    .on("error",function(err){
        gutil.log(err);
        this.emit("end");
    })
    .pipe(source("app.b.js"))
    .pipe(gulp.dest("./"));
});

gulp.task("browserify-watch",["browserify"],(done)=>{
    browserSync.reload();
    done();
});

gulp.task("debug",()=>{
    browserSync.init({
        files:["./**/*.html"],
        server:"./"
    });
    
    gulp.watch("./app.js",["browserify-watch"]);

});