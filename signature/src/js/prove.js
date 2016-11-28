'use strict';
import ajax from './util/ajax'
import setBg from './util/setBg'
import logout from './util/logout'
import random from '../../util/random'
import util from './util/util'

setBg();
logout();
let dna = null;
let uniqueCode = null;
const inpWrap = $('.inp-orgInfo');
const btnApply = $('#btn-apply');
//const state = util.getCurrentUrlParam('state');

btnApply.on('click', ()=>{
	uniqueCode = $.trim(inpWrap.val());
	if(uniqueCode == ''){
		alert('您输入的标示符有误，请重新输入');
		inpWrap.focus();
		return false;
	}
	const rndNum = random.createRand(8);
	ajax.post(ajax.api.VERIFYUNIQUECODE, {uniqueCode: uniqueCode}, {token: true})
		.then(res=>{
			if(res.result.code == 0){
				let url = location.href.split('?')[0] + '?state=2';
				dna = res.content.DNA;				
				//location.href = url;
				$('.proveWrap').addClass('hidden');
				$('.proveState2').removeClass('hidden');
			}else{
				alert(res.result.description);
			}
		})
		.catch(err=>{
			console.log(err);
			alert('查询失败');
		});
	/*	
	ajax.post(ajax.api.APPLYFORTESTIFY, {dna: dna, uniqueCode: rndNum})
		.then(res=>{
			console.log(res);
		})
		.catch(err=>{
			console.log(err);
			alert('申请出证失败');
		})*/
});

const processBar = $('.processBar');
const progressTxt = $('.progressTxt');
const progressInner = $('.progressInner');

function uploadFile(file, apiName, el1, el2) {
    var fd = new FormData();
    fd.append('file', file);
    fd.append('dna', dna);
    fd.append('uniqueCode', uniqueCode);
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (e)=>{
    	uploadProgress(e, el1, el2);
    }, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST", '/api/applyForTestify');
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
		$('.proveWrap').addClass('hidden');
		$('.proveState3').removeClass('hidden');		
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