'use strict';
import ajax from './util/ajax'

const   userNameWrap = $('#userName'),
		pwdWrap = $('#pwd'),
		btnLogin = $('.btn-login');

btnLogin.off('click').on('click', ()=>{
	if($.trim(userNameWrap.val()) == ''){
		alert('请输入您的企业账户ID');
		userNameWrap.focus();
	}else if($.trim(pwdWrap.val()) == ''){
		alert('请输入您的企业密钥');
		pwdWrap.focus();
	}else{
		ajax.post(ajax.api.LOGIN, {"organizeId": $.trim(userNameWrap.val()),"secret": $.trim(pwdWrap.val())})
			.then(res=>{
				const data = res.result;
				if(data.code == '0'){
					alert('登录成功');
					location.href = '/orgInfo';
				}else{
					alert(data.description);
				}
			})
			.catch(err=>alert(err));
	}
});