var gulp = require('gulp'),
		del = require('del'),
		sass = require('gulp-sass'),
		jade = require('gulp-jade'),
		connect = require('gulp-connect'),
		include = require('gulp-file-include'),
		spritesmith  = require('gulp.spritesmith'),
		cssbeautify = require('gulp-cssbeautify'),
		autoprefixer = require('gulp-autoprefixer');

var outputDir = 'build';

gulp.task('connect', function () {
	connect.server({
		root: ['./build'],
		port: '8080',
		livereload: true
	});
});

// Scripts
gulp.task('js', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(gulp.dest(outputDir + '/js'))
		.pipe(connect.reload());
});

// Fonts
gulp.task('fonts', function() {
	return gulp.src('src/fonts/*.*')
		.pipe(gulp.dest(outputDir + '/fonts'));
});

//	Jade
gulp.task('jade', function() {
	return gulp.src('src/jade/*.jade')
		// .pipe(plumber({errorHandler: notify.onError("Jade error!")}))
		// .pipe(include())
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload());
});

// Styles
gulp.task('sass', function () {
	gulp.src('src/sass/*.sass')
		.pipe(sass())
		.pipe(cssbeautify({
			indent: '  '
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 version', '> 1%', 'Firefox ESR', 'Opera 12.1', 'ie 8' ],
			cascade: false
		}))
		.pipe(gulp.dest(outputDir + '/css'))
		.pipe(connect.reload());
});

// Images
gulp.task('img', function() {
	return gulp.src('src/img/*.*', '!src/img/**/*')
		.pipe(gulp.dest(outputDir + '/img'));
});

// Sprites
gulp.task('sprite', function() {
	var spriteData =
		gulp.src('src/img/icons/*.png')
			.pipe(spritesmith({
				imgName: 'sprite.png',
				cssName: '_sprite.sass',
				cssFormat: 'sass',
				algorithm: 'binary-tree',
				padding: 5,
				cssTemplate: 'sass.template.mustache',
				cssVarMap: function(sprite) {
					sprite.name = 's-' + sprite.name
				}
			}));
	spriteData.img.pipe(gulp.dest(outputDir + '/img'));
	spriteData.css.pipe(gulp.dest('src/sass/lib'));
});

// Clean outputDir
gulp.task('clean', function (cb) {
	del([
		outputDir,
	], cb);
});

// Watch files for changes
gulp.task('watch', function() {
	gulp.watch('src/img/icons/*.png', ['sprite']);
	gulp.watch('src/jade/*.jade', ['jade']);
	gulp.watch('src/jade/includes/*.jade', ['jade']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/img/*', ['img']);
	gulp.watch('src/fonts/*', ['fonts']);
	gulp.watch('src/sass/*.{sass,scss}', ['sass']);
	gulp.watch('src/sass/**/*.{sass,scss}', ['sass']);
});

// Build task
gulp.task('build', [ 'sprite', 'jade', 'fonts', 'sass', 'js', 'img' ]);

// Default task
gulp.task('default', [ 'sprite', 'jade', 'fonts', 'js', 'img', 'sass', 'connect', 'watch']);
