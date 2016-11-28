'use strict';
const apiUtil = require('../../util/apiUtil');

const api_dataContent = (req, res, next) => {	
	apiUtil.dataCont(req, res);
	next();
}

module.exports = api_dataContent;