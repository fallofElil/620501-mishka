"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    plumber = require("gulp-plumber"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    server = require("browser-sync").create(),
    svgSprite = require("gulp-svg-sprite"),
    cheerio = require("gulp-cheerio"),
    svgmin = require("gulp-svgmin"),
    replace = require("gulp-replace"),
    fileinclude = require("gulp-file-include");

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "server", "includeSprite"));

gulp.task("buildSvgSprite", function () {
  return gulp.src("source/img/*.svg")
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $("[fill]").removeAttr("fill");
        $("[stroke]").removeAttr("stroke");
        $("[style]").removeAttr("style");
      },
      parseOptions: { xmlMode: true }
    }))
    .pipe(replace("&gt;", ">"))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "sprite.svg"
        }
      }
    }))
    .pipe(gulp.dest("source/img/sprite"));
});

gulp.task("includeSprite", function () {
  gulp.src(["source/img/sprite/symbol/*"])
    .pipe(fileinclude({
      prefix: "@@",
      basepath: "@file"
    }))
    .pipe(gulp.dest("./"));
});
