'use strict';
const _ = require('lodash');
module.exports = (req, res, next, template, data)=>{	
	if(req.session.orgInfo && typeof req.session.orgInfo != 'undefined'){
		let infoFull = true;
		_.filter(req.session.orgInfo, (v, k)=>{
			if(v === null){
				infoFull = false
			}	
		});
		req.session.infoFull = infoFull;
		data.infoFull = infoFull;
		data.isLogin = req.session.isLogin;
		data.orgInfo = JSON.stringify(req.session.orgInfo);		
	    res.render(template, data);
    }else{
    	res.redirect('/login');
    }
}