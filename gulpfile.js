// 💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈 
// 1. Déclaration des variables 
// 💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈 

let gulp = require('gulp');
let sass = require('gulp-sass')(require('sass'));
let rename = require("gulp-rename");
let sourcemaps = require('gulp-sourcemaps');
let autoprefixer = require('gulp-autoprefixer');
let uglify = require('gulp-uglify');
const { registry } = require('gulp');
let browserSync = require('browser-sync').create();

// 💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈 
// 2. Mes tâches
// 💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈 

// remplace la moulinette de sass qui va transformer mes .scss en .css
gulp.task('sassification', function() {
    return gulp.src('dev/css/*.scss') 
    // ajouter le fichier sourcemap 
    .pipe(sourcemaps.init())
    // compresser le fichier 
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    // rename le fichier css avec le min..
    .pipe(rename(function (path) {
        path.basename += ".min";
    }))
    // destination 
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('prod/css'));
});

//htmlification 
gulp.task('htmlification', function() {
	return gulp.src('dev/*.html')
	.pipe(gulp.dest('prod'));
});

//jsification
gulp.task('jsification',function () {
	return gulp
		.src('dev/script/*.js')
		.pipe(uglify())
		.pipe(rename(function (path) {
				path.basename += '.min';
			}))
		.pipe(gulp.dest('prod/script'));
});

//browser-sync
gulp.task('browser-sync', function (){
	browserSync.init({
		server: {
			baseDir: 'prod/',
		},
	});
})

// lancement d'image 
gulp.task('imaginification', function (){
    return gulp.src('dev/img/*')
    .pipe(gulp.dest('prod/img'));
})

// 💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈 
// 3. Execution des tâches
// 💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈💫🌙🌈 

gulp.task('observation',gulp.parallel('browser-sync', 'sassification','htmlification','jsification', 'imaginification', function (){
    gulp.watch('dev/css/**/*.scss', gulp.series('sassification'));
    gulp.watch('dev/*.html', gulp.series('htmlification'));
    gulp.watch('dev/script/*.js', gulp.series('jsification'));
    gulp.watch('prod/**/*').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('observation'));
