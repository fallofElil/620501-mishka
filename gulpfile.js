"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    plumber = require("gulp-plumber"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    server = require("browser-sync").create(),
    cheerio = require("gulp-cheerio"),
    replace = require("gulp-replace"),
    rename = require("gulp-rename"),
    del = require("del"),
    posthtml = require("gulp-posthtml"),
    include = require("posthtml-include"),
    csso = require("gulp-csso"),
    svgmin = require("gulp-svgmin"),
    svgstore = require("gulp-svgstore");

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("svgSprite", function () {
  return gulp.src("source/img/*.svg")
    .pipe(svgmin({
      plugin: [{
        removeViewBox: false
      }]
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(cheerio({
      run: function ($) {
        $("[fill]").removeAttr("fill");
        $("[style]").removeAttr("style");
      },
      parseOptions: { xmlMode: true }
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/svg"));
});

gulp.task("html", () => {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("cleanTrash", function () {
  return del(["build/header.html", "build/footer.html", "build/modal.html"]).then(paths => {
    console.log("Deleted files:\n", paths.join("\n"));
  });
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/logo/**",
    "source/img/svg/**",
    "source/img/**.jpg",
    "source/img/pp/**.jpg",
    "source/js/**"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("build", gulp.series("clean", "copy", "css", "svgSprite", "html", "cleanTrash"));
gulp.task("start", gulp.series("css", "server"));

gulp.task("reload", gulp.series("build", "start"));
