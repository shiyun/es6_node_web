'use strict';
import logout from './util/logout'

logout();

/*
ajax.post(ajax.api.LOGIN, {"organizeId":"1004","secret":"C6F215DAB70B852CED70853BE873DE3B"})
	.then(res=>{
		const data = res.content;
	 	const token = data.token;
	 	console.log(token);
	 	ajax.post(ajax.api.VERIFYUNIQUECODE,{"token":token,"organizeId":"1004","uniqueCode":"1234543"})
	 		.then(res=>{
	 			console.log('VERIFYUNIQUECODE:',res);
	 		})
	 		.catch(err=>console.log(err));

	 	ajax.post(ajax.api.INFOADD,{"token":token,"organizeId":"1004","name":"test","organType":"0","secret":"C6F215DAB70B852CED70853BE873DE3B","organCode":"3432","legalName":"test","legalIdNo":"3432","email":"test@fabao.cn","mobile":"13524898984"})
	 		.then(res=>{
	 			console.log('INFOADD:',res);
	 		})
	 		.catch(err=>console.log(err));

	 	ajax.post(ajax.api.TESTIFYLIST,{"token":token,"organizeId":"1004","uniqueCode":"1234543"})
	 		.then(res=>{
	 			console.log('TESTIFYLIST:',res);
	 		})
	 		.catch(err=>console.log(err));
	})
	.catch(err=>console.log(err));*/