const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const gcmq = require('gulp-group-css-media-queries');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass');
const webStream = require('webpack-stream');
const smartGrid = require('smart-grid');
const imagemin = require('gulp-imagemin');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

const isDev = (process.argv.includes('--dev'));
const isProd = !isDev;
const isSync = (process.argv.includes('--sync'));

let webpackConfig = {
	output: {
		filename: 'all.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			}
		]
	},
	mode: isDev ? 'development' : 'production',
	devtool: isDev ? 'eval-source-map' : 'none'
}

function clear(){
	return del('build/*');
}

function styles(){
	return gulp.src('./src/css/style.scss')
			   .pipe(gulpif(isDev, sourcemaps.init()))
			   .pipe(sass())
			   .pipe(gcmq())
			   .pipe(autoprefixer({
		            overrideBrowserlist: ['> 0.1%'],
		            cascade: false
		        }))
			   .pipe(gulpif(isProd, cleanCSS({
			   		level: 2
			   })))
			   .pipe(gulpif(isDev, sourcemaps.write()))
			   .pipe(gulp.dest('./build/css'))
}

function img(){
	return gulp.src('./src/img/**/*')
	.pipe(gulpif(isProd, imagemin({
		progressive: true,
		svgoPlugins: [{ removeViewBox: false }],
		interlaced: true,
		optimizationLevel: true
	})))
		.pipe(gulp.dest('./build/img'))
		.pipe(browserSync.stream())
}

function html() {
	return gulp.src(['./src/*.html','!./src/_*.html' ])
		.pipe(fileinclude())
		.pipe(gulp.dest('./build'))
}

function js() {
	return gulp.src('./src/script/script.js')
		.pipe(webStream(webpackConfig))
		.pipe(gulp.dest('./build/script'))
		.pipe(browserSync.stream())
}

function fonts() {
	gulp.src('./src/fonts/**/*')
		.pipe(ttf2woff())
		.pipe(gulp.dest('./build/fonts'));
	return gulp.src('./src/fonts/**/*')
	.pipe(ttf2woff2())
	.pipe(gulp.dest('./build/fonts'))
}
 
function smartgrid(done) {
	let settings = {
		outputStyle: 'scss',
		columns: 12,
		offset: '30px',
		mobileFirst: false,
		container: {
			maxWidth: '1240px',
			fields: '30px'
		},
		breakPoints: {
			lg: {
				width: '1080px',
			},
			md: {
				width: '980px'
			},
			sm: {
				width: '860px',
			},
			smMin: {
				width: '760px'
			},
			xs: {
				width: '590px'
			},
			mobileLg: {
				width: '480px',
				fields: '15px'
			},
			mobileMd: {
				width: '430px',
				fields: '15px'
			},
			mobileMdMin: {
				width: '380px',
				fields: '15px'
			},
			mobileS: {
				width: '320px',
				fields: '15px'
			}
		}
	}
	smartGrid('./src/css/', settings);
	done();

};
 
function watch(){
	if(isSync){
		browserSync.init({
	        server: "./build/",
		});
	}

	gulp.watch('./src/**/*.scss', styles).on("change", browserSync.reload);
	gulp.watch('./src/**/*.html', html).on("change", browserSync.reload);
	gulp.watch('./src/**/*.js', js)
	gulp.watch('./src/img/**/*', img)
}

let build = gulp.series(clear, 
	gulp.parallel(styles, html, js, fonts, img)
);

gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
gulp.task('smartgrid', smartgrid);

