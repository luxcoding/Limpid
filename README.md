gulp-starter
============

Basic project boilerplate with [gulp.js](http://gulpjs.com/).

Includes the following tools:

- [Sass](http://sass-lang.com/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [Head.JS](http://headjs.com/)
- [CSS Beautify](https://www.npmjs.org/package/gulp-cssbeautify) (from npm)
- [File includes](https://www.npmjs.org/package/gulp-file-include) (from npm)
- [Spritesmith](https://github.com/twolfson/gulp.spritesmith) (from npm)

## Getting Started

#### 1. Install Node.js

If you've never used Node.js or `npm` before download and install it from [http://nodejs.org/download/](http://nodejs.org/download/).

#### 2. Install gulp.js

```sh
$ npm install -g gulp
```

Gulp must be installed globally.
You may need to use `sudo` to run the install commands as admin.

#### 3. Install Sass (if you haven't already)

```sh
$ gem install sass
```

#### 4. Install npm dependencies

**Important:** Make sure you're in the project directory.

```sh
$ npm install
```

This runs through all dependencies listed in `package.json` and downloads them to a `node_modules` folder in your project directory.

#### 5. Run gulp

```sh
$ gulp
```

## Directory Structure

```
gulp-starter/
|
|– src/
|   img/
|      icons/
|         ...
|   js/
|      lib/
|         head.js
|         jquery.js
|         ...
|      init.js
|      common.js
|   sass/
|      lib/
|         _mixins.sass
|         _sprite.sass
|         ...
|      _reset.sass
|      _layout.sass
|      common.sass
|   *.html
|
|– build/
|   img/
|      sprite.png
|   js/
|      lib/
|         head.js
|         jquery.js
|         ...
|      common.js
|   css/
|      common.css
|   *.html
```

## License

This projected is licensed under the terms of the [MIT license](https://github.com/pismenny/gulp-starter/blob/master/LICENSE.md).
