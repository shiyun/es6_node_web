'use strict';
import ajax from './util/ajax'
import logout from './util/logout'

logout();

const processBar = $('.processBar');
const progressTxt = $('.progressTxt');
const progressInner = $('.progressInner');

function uploadFile(file, apiName, el1, el2) {
    var fd = new FormData();
    fd.append('file', file);
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (e)=>{
    	uploadProgress(e, el1, el2);
    }, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST", '/api/verifyPDF');
    xhr.send(fd);
}
function uploadProgress(evt, el1, el2) {
	if (evt.lengthComputable) {
		var percentComplete = Math.round(evt.loaded * 100 / evt.total);
		el1.html(percentComplete+'%');
		el2.css('width', percentComplete+'%');
	}else {
		el1.html('0%');
		el2.css(width, '0%');
		resetUpload();
	}
}

function uploadComplete(evt) {
	let r = JSON.parse(evt.target.responseText);
	console.log(r);
	let uploadInfo = $('#uploadInfo');
	if(r.result.code == '0'){
		uploadInfo.html(uploadInfo.data('success'));		
	}else{
		uploadInfo.html(uploadInfo.data('fail'));
	}
	resetUpload();
}

function uploadFailed(evt) {
	alert("上传失败");
}

function uploadCanceled(evt) {
	alert("上传被取消");
}

function resetUpload(){
	processBar.addClass('hidden');
	progressTxt.html('0%');
	progressInner.css('width', '0%');
	$('#upFile').val('');
}

$('#upFile').on('change', (ev)=>{
	processBar.removeClass('hidden');
	console.log(ev.target.files[0]);
	let file = ev.target.files[0];
	if(file.type !== 'application/pdf'){
		alert('请上传PDF格式文件');
		resetUpload();
		return false;
	}
	uploadFile(ev.target.files[0], ajax.api.VERIFYPDF, progressTxt, progressInner);	
});