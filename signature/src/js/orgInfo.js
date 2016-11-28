'use strict';
import ajax from './util/ajax'
import setBg from './util/setBg'
import logout from './util/logout'
import _util from './util/util'

setBg();
logout();

$('.btn-submit').off('click').on('click', ()=>{
	let compInfo = true, selectWrap = $('.select-orgInfo'), selectVal = selectWrap.find('option:selected').val();
	$('.inp-orgInfo').each((i)=>{		
		let $this = $('.inp-orgInfo').eq(i);
		if($.trim($this.val()) == ''){
			let err = $this.data('err');
			alert(err);
			$this.focus();
			compInfo = false;
			return false;
		}		
	});	

	if(!compInfo) return false;

	if(selectVal == -1){
		alert(selectWrap.data('err'));
		compInfo = false;
		return false;
	}

	if(!_util.isCardNo($.trim($('#legalIdNo').val()))){
		alert($('#legalIdNo').data('err'));
		$('#legalIdNo').focus();
		compInfo = false;
		return false;
	} 

	if(!_util.isEmail($.trim($('#email').val()))){
		alert($('#email').data('err'));
		$('#email').focus();
		compInfo = false;
		return false;
	}

	if(!_util.isPhone($.trim($('#mobile').val()))){
		alert($('#mobile').data('err'));
		$('#mobile').focus();
		compInfo = false;
		return false;
	}	

	if(!compInfo) return false;

	if(compInfo){
		let orgInfo = JSON.parse($('#orgInfo').val());	
		let data = {"token": orgInfo.token,"organizeId": orgInfo.organizeId,"name": $.trim($('#name').val()),"organType": selectVal,"secret": orgInfo.secret,"organCode": $.trim($('#organCode').val()),"legalName": $.trim($('#legalName').val()),"legalIdNo":$.trim($('#legalIdNo').val()),"email":$.trim($('#email').val()),"mobile":$.trim($('#mobile').val())};
		ajax.post(ajax.api.INFOADD, data)
	 		.then(res=>{
	 			if(res.result.code == '0'){
	 				ajax.post(ajax.api.LOGIN, {}, {token: true})
	 					.then(res=>{
	 						if(res.result.code == 0){
	 							location.reload();
	 						}
	 					})
	 					.catch(err=>{
	 						ajax.post(ajax.api.LOGOUT, {})
								.then(res=>{
									if(res.result.code == 0){
										alert('请重新登录');
										location.href = '/login';
									}
								})
								.catch(err=>{
									alert('请重新登录');
									location.href = '/login';
								});
	 					})
	 			}else{
					alert(res.result.description);
				}
	 		})
	 		.catch(err=>console.log(err));
	}
});