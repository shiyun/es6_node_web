'use strict';
const request = require('request');
const _ = require('lodash');

class ApiUtil {
	constructor(){

	}

	dataCont(req, res){
		req.cont = {}
		let url = req.url.split('/');		
		if(url.length < 3){
			res.send({header: {status: 0}, body:{msg: "请求的路径有误！"}});
			return ;
		}
		req.cont.server  = url[1];
		req.cont.command = url[2];
		if(url.length > 3){
			url.splice(0, 2);
			req.cont.command = url.join('/');
		}
		let method = req.method;
		if(method == 'POST'){
			req.cont.data = req.body;
			req.cont.method = 'POST';
		}else{
			req.cont.data = req.body;
			req.cont.method = 'GET';
		}
	}

	widthToken(req){
		if(req.query && req.query.token == 'true'){
			req.cont.data.token = req.session.orgInfo.token;
			req.cont.data.organizeId = req.session.orgInfo.organizeId;
			if(!req.query.secret || req.query.secret != 'false'){
				req.cont.data.secret = req.session.orgInfo.secret;
			}
			//req.cont.data.dna  = req.session.orgInfo.accountId;
			//req.cont.data.uniqueCode   = req.session.orgInfo.organizeId;
		}
	}

	request(req, responseHandler){
		let data = req.cont;
		let url = global.CONFIG[req.cont.server] + req.cont.command;
		console.log(`[BODY]: ${JSON.stringify(data.data)}`);
		if(data.method == 'POST'){
			console.log(`----------------------------------------------\n[POST TO ${url}]\n----------------------------------------------`);
			//request.post(url, responseHandler).form(data.data);			
			request({
			    url: url,
			    method: "POST",
			    json: true,			    
				headers: {"content-type": "application/json"},
			    body: data.data},
			responseHandler);
		}else{
			let params = '?';
			_.forEach(data.data, (v, k)=>{
				if(_.isString(v)){
					params += k + '=' + v + '&';
				}else if(_.isObject(v)){
					params += k + '=' + JSON.stringify(v) + '&';
				}
			});
			console.log(`----------------------------------------------\n[GET TO ${url}]\n----------------------------------------------`);
			request.get(url, responseHandler);
		}
	}

	api(req, res, responseHandler){
		this.dataCont(req, res);
		this.widthToken(req);
		this.request(req, responseHandler);
	}
}

module.exports = new ApiUtil();