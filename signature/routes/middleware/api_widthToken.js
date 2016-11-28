'use strict';
const apiUtil = require('../../util/apiUtil');

const api_widthToken = (req, res, next) => {	
	apiUtil.widthToken(req, res);
	next();
}

module.exports = api_widthToken;