# gulp-sass-universal

Sass plugin for [Gulp](https://github.com/gulpjs/gulp).

Support M1 (ARM) MacOS

# Install

```
npm install gulp-sass-universal --save-dev
```

# Basic Usage

Example:

```javascript
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass-universal');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});
```
