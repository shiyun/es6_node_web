'use strict';
import gulp from 'gulp';
import cache from 'gulp-cache';
import wrench from 'wrench';
import {signArr} from './gulp/signature_const';

wrench.readdirSyncRecursive('./gulp').filter(file => {
	return (/\.js$/i).test(file);
}).map(file => {
	require('./gulp/'+file);
});

gulp.task('test', ()=>{
	gulp.start(['sign_libs']);
});

gulp.task('sign', ()=>{
	let arr = ['sign_clean', 'sign_libs', 'sign_less', 'sign_images', 'sign_watch'];
	Array.prototype.push.apply(arr, signArr);
	gulp.start(arr);
});

gulp.task('cleanCash', function (done) {  
    return cache.clearAll(done);  
}); 

// 默认任务
gulp.task('default', function(){
	gulp.run('clean', 'libs', 'util', 'less', 'comps', 'live', 'images');
	gulp.watch('../src/less/*.*', ['less']);
	gulp.watch('../src/images/**/*.*', ['images']);
	gulp.watch('../src/comp/**/main.js', ['comps']);
	gulp.watch('../src/util/*.*', ['util']);
});