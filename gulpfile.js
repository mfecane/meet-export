import gulp from "gulp";
import gulpSass from "gulp-sass";
import sass from "sass";
import browserSyncImport from "browser-sync";
import data from "gulp-data";
import path from "path";
import twig from "gulp-twig";
import plumber from "gulp-plumber";
import concat from "gulp-concat";
import sourcemaps from "gulp-sourcemaps";
import fs from "fs";
import clean from "gulp-clean";
import fileinclude from "gulp-file-include";
import { css } from "./gulp/scss.js";

import { deleteAsync } from "del";

const { src, parallel, series, watch, dest } = gulp;

var paths = {
  html: "./src/html/*.html",
  dist: "./dist/",
  scss: "./src/scss/",
  data: "./src/data/",
  js: "./src/js/",
};

const browserSync = browserSyncImport.create();

const clear = () => {
  return deleteAsync("./dist");
};

export const html = () => {
  return src([paths.html])
    .pipe(fileinclude())
    .pipe(
      plumber({
        handleError: function (err) {
          console.log(err);
          this.emit("end");
        },
      })
    )
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
};

// function html() {
//   return (
//     gulp
//       .src(["./src/templates/*.twig"])
//       // .pipe(clean({ force: true }))
//       .pipe(
//         plumber({
//           handleError: function (err) {
//             console.log(err);
//             this.emit("end");
//           },
//         })
//       )
//       .pipe(
//         data(function (file) {
//           console.log("reread file");
//           return JSON.parse(
//             fs.readFileSync(paths.data + path.basename(file.path) + ".json")
//           );
//         })
//       )
//       .pipe(
//         twig().on("error", function (err) {
//           console.log(err);
//           this.emit("end");
//         })
//       )
//       .pipe(gulp.dest(paths.dist))
//   );
// }

const server = () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
};

const js = () => {
  return gulp
    .src("src/js/script.js")
    .pipe(sourcemaps.init())
    .pipe(concat("script.min.js"))
    .on("error", function (err) {
      console.log(err.toString());
      this.emit("end");
    })
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/js"));
};

const assets = () => {
  return src("./assets/**/*")
    .pipe(
      plumber({
        handleError: function (err) {
          console.log(err);
          this.emit("end");
        },
      })
    )
    .pipe(dest("dist/assets"));
};

const favicon = () => {
  return src("./assets/images/favicon.ico").pipe(dest("dist/"));
};

const updateBrowser = () => {
  browserSync.reload();
};

export const watcher = () => {
  watch("./src/html/**/*.html", html).on("change", updateBrowser);
  watch("./src/scss/**/*.scss", css).on("change", updateBrowser);
  watch("./data/*.json", html).on("change", updateBrowser);
  watch("./src/js/**/*.js", js).on("change", updateBrowser);
};

export const dev = series(
  clear,
  parallel(favicon, assets, html, css, js),
  parallel(watcher, server)
);

export const build = series(clear, parallel(favicon, assets, html, css, js));

// export const config = series(
//   watch(["./gulpfile.js", "./gulp/**/*.js"], build).on("change", updateBrowser)
// );

export default build;
