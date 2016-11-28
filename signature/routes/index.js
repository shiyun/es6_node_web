'use strict';
const express = require('express');
const router = express.Router();
const checkLogin = require('../util/checkLogin');

router.get(/^(\/|\/index)$/, (req, res, next) => {
	let isLogin = req.session.isLogin || 0;
    res.render('index', {title: '电子签章官网', curNum: 0, isLogin});
});

router.get('/login', (req, res, next) => {
	let isLogin = req.session.isLogin || 0;
    res.render('login', {title: '电子签章官网', curNum: -1, isLogin});
});

router.get('/orgInfo', (req, res, next) => {
	checkLogin(req, res, next, 'orgInfo', {title: '电子签章官网', curNum: -1, curNav: 0});
	//let orgInfo = {"legalIdNo":null,"legalName":null,"organCode":null,"organType":0,"accountId":null,"token":"6db86f76bbabdbe36aef8cc98a9d0841","email":null,"name":null,"organizeId":null,"secret":"C6F215DAB70B852CED70853BE873DE3B","mobile":null};
	//res.render('orgInfo', {title: '电子签章官网', curNum: -1, curNav: 0, orgInfo: JSON.stringify(orgInfo), infoFull: false})
});

router.get('/prove', (req, res, next) => {
	checkLogin(req, res, next, 'prove', {title: '电子签章官网', curNum: -1, curNav: 1});
    //res.render('prove', {title: '电子签章官网', curNum: -1, curNav: 1});
});

router.get('/list', (req, res, next) => {
	checkLogin(req, res, next, 'list', {title: '电子签章官网', curNum: -1, curNav: 2});
    //res.render('list', {title: '电子签章官网', curNum: -1, curNav: 2});
});

router.get('/onlineProve', (req, res, next) => {
	let isLogin = req.session.isLogin || 0;
    res.render('onlineProve', {title: '电子签章官网', curNum: 2, isLogin});
});

router.get('/partners', (req, res, next) => {
	let isLogin = req.session.isLogin || 0;
    res.render('partners', {title: '电子签章官网', curNum: 3, isLogin});
});

router.get('/product', (req, res, next) => {
	let infoFull = req.session.infoFull || false;
	let isLogin = req.session.isLogin || 0;
    res.render('partners', {title: '电子签章官网', curNum: 1, infoFull, isLogin});
});

module.exports = router;
