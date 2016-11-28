'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const request = require('request');
const http = require('http');
const path = require('path');
const formidable = require('formidable');
const querystring = require('querystring');
const _ = require('lodash');
const apiUtil = require('../util/apiUtil');
const jsonFormat = require('../util/jsonFormat');
const upload = require('../util/upload');

router.post('/login', (req, res, next) => {
	req.method = 'POST';
	req.url = '/API_URL/login';
	apiUtil.api(req, res, (err, resp, body)=>{
		if(err){
			res.send(jsonFormat.fail('登录失败'));
		}else{
			if(body.result.code == '0'){
				req.session.orgInfo = body.content;
				req.session.orgInfo.organizeId = req.body.organizeId;
				req.session.isLogin = 1;
				res.send(jsonFormat.success('登录成功'));
			}else{
				res.send(jsonFormat.fail('登录失败'));
			}
		}
	});
});

router.post('/logout', (req, res, next)=>{
	delete req.session.isLogin;
	delete req.session.orgInfo;
	res.send(jsonFormat.success('退出成功'));
});

router.post('/verifyPDF', (req, res, next)=>{
	//console.log(path.join(__dirname, '../public/tmp/test13.pdf'));
	let form = new formidable.IncomingForm();
	form.uploadDir = './public/tmp';
	form.keepExtensions = true;//保存扩展名
    form.maxFieldsSize = 200 * 1024 * 1024;//上传文件的最大大小
	form.parse(req, (err, fields, files)=>{
		if(err) throw err;
		fs.renameSync(files.file.path, path.join(__dirname, '../public/tmp/'+files.file.name));
		let filePath = path.join(__dirname, '../public/tmp/'+files.file.name);
		let fileList = [
			{urlKey: "file", urlValue: filePath} 
		];
		const url = global.CONFIG.API_URL.split('//')[1].split('/');
		const options = { 
			host: url[0], 
			//port: "8081" , 
			method: "POST", 
			path: '/' + url[1] + "/verifyPDF"
		}	

		let reqs = http.request(options, function(ress){
			/*console.log("RES:" + ress);
			console.log('STATUS: ' + ress.statusCode);
			console.log('HEADERS: ' + JSON.stringify(ress.headers));
			//res.setEncoding("utf8");*/
			ress.on("data", function(chunk){
				console.log("BODY:" + chunk);				
				res.send(chunk);
				fs.unlink(filePath);
			});
		})

		reqs.on('error', function(e){
			console.log('problem with request:' + e.message);
			console.log(e);
		});
		
		upload.postFile(fileList, reqs);
	});		
});

router.post('/applyForTestify', (req, res, next)=>{
	//console.log(path.join(__dirname, '../public/tmp/test13.pdf'));
	let form = new formidable.IncomingForm();
	form.uploadDir = './public/tmp';
	form.keepExtensions = true;//保存扩展名
    form.maxFieldsSize = 200 * 1024 * 1024;//上传文件的最大大小
	form.parse(req, (err, fields, files)=>{
		if(err) throw err;
		fs.renameSync(files.file.path, path.join(__dirname, '../public/tmp/'+files.file.name));
		let filePath = path.join(__dirname, '../public/tmp/'+files.file.name);
		let fileList = [
			{urlKey: "file", urlValue: filePath}
		];
		const url = global.CONFIG.API_URL.split('//')[1].split('/');
		const options = { 
			host: url[0], //url[0].split(':')[0], 
			// port: url[0].split(':')[1], 
			method: "POST", 
			path: '/' + url[1] + "/applyForTestify"			
		}	
		let reqs = http.request(options, function(ress){
			/*console.log("RES:" + ress);
			console.log('STATUS: ' + ress.statusCode);
			console.log('HEADERS: ' + JSON.stringify(ress.headers));
			//res.setEncoding("utf8");*/
			ress.on("data", function(chunk){
				console.log("BODY:" + chunk);				
				res.send(chunk);
				try{
					fs.unlink(filePath);
				}catch(e){
					console.log(e);
				};
			});
		})

		reqs.on('error', function(e){
			console.log('problem with request:' + e.message);
			console.log(e);
		});
		let data = {dna: fields.dna, token: req.session.orgInfo.token, organizeId: req.session.orgInfo.organizeId, uniqueCode: fields.uniqueCode};
		upload.postFile(fileList, reqs, data);
	});		
});


module.exports = router;
