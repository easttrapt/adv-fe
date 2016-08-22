var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var debug = require('gulp-debug');
var clean = require('gulp-clean');
var bower = require('gulp-bower');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var csscomb = require('gulp-csscomb');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var htmlhint = require('gulp-htmlhint');
var livereload = require('gulp-livereload');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');



//flags
var prod  = gutil.env.prod;

gulp.task('images', function(){
	return gulp.src(['**/*.{png,jpg,svg}','!node_modules/**','!libs','!bower_components'])
		.on('data', function (file) {
			console.log({
				contents: file.contents,
				path: file.path,
				cwd: file.cwd,
				base: file.base
			});
		})
		.pipe(gulp.dest('bin'))
		.pipe(livereload());
});

gulp.task('html', function(){
	return gulp.src(['**/*.html','!node_modules/**','!libs','!bower_components'])
		.pipe(prod ? htmlmin({collapseWhitespace: true}) : gutil.noop())
		.pipe(gulp.dest('bin'))
		.pipe(livereload());
});

gulp.task('css', function(){
	return gulp.src(['**/*.less','!node_modules/**','!libs','!bower_components'])
		.pipe(debug())
		.pipe(prod ? gutil.noop() : sourcemaps.init())
		.pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
		.pipe(cssnano())
		.pipe(concat('styles.css'))
		.pipe(prod ? gutil.noop() : sourcemaps.write())
		.pipe(gulp.dest('bin/static/'))
		.pipe(livereload());
});

gulp.task('js', function(){
	return gulp.src(['js/**/*.js','!node_modules/**','!libs','!bower_components'])
		.pipe(debug())
		.pipe(prod ? gutil.noop() : sourcemaps.init())
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(prod ? gutil.noop() : sourcemaps.write())
		.pipe(gulp.dest('bin'))
		.pipe(livereload());
});

gulp.task('clean', function(){
	return gulp.src('bin/*', { read: false })
		.pipe(debug())
		.pipe(clean());
});

gulp.task('copy-static', function(){
	return gulp.src(['images/**/*.{png,jpg,svg}', '*.html', '!node_modules/**','!libs','!bower_components']) //не использовал 'js/**/*.js', так как js собираю отдельно
		.pipe(debug())
		.pipe(gulp.dest('bin'));
});

gulp.task('bower', function(){
	return bower('libs');
});

gulp.task('libs', function(){
	return gulp.src('libs/**/*.min.js')
		.pipe(debug())
		.pipe(gulp.dest('bin/libs'));
});

gulp.task('build', function(clb){
	runSequence('copy-static', 'css', 'js');
	clb();
});

gulp.task('default', function(clb){
	runSequence('libs', 'build');
	clb();
});

gulp.task( 'watch', function () {
	livereload.listen();
    gulp.watch('**/*.@(png|jpg|svg)', [ 'images' ] );
    gulp.watch('**/*.@(html)', [ 'html' ] );
    gulp.watch('**/*.@(js)', [ 'js' ] );
    gulp.watch('**/*.@(less)', [ 'css' ] );
} );

//CODESTYLE
gulp.task('csscomb', function () {
    return gulp.src('styles/*.less')
        .pipe(csscomb())
        .pipe(gulp.dest('styles'));
});


gulp.task('htmlhint', function () {
	return gulp.src(['**/*.html','!node_modules/**','!libs','!bower_components'])
		.pipe(debug())
		.pipe(htmlhint('.htmlhintrc'))
		.pipe(htmlhint.reporter());
		//ругается на незакрытый тег мета
});

gulp.task('jscs', function () {
	return gulp.src('js/*.js')
		.pipe(debug())
		.pipe(jscs({fix: true}))
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'))
		.pipe(gulp.dest('js'));
});

gulp.task('jshint', function () {
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('style', function(clb){
	runSequence('csscomb', 'htmlhint','jshint', 'jscs');
	clb();
});