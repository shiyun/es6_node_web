'use strict';
const apiUtil = require('../../util/apiUtil');

const api_callback = (req, res) => {
	apiUtil.request(req, (error, response, body) => {
		if(error){
			console.log("[ RESPONSE ERROR ] : ", error);	
		}else{
			console.log("[ RESPONSE ] : ", body);			
			res.send(body);
		}
	});
}

module.exports = api_callback;