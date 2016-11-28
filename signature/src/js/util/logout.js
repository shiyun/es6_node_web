'use strict'
import ajax from './ajax'

export default ()=>{
	if($('.logout').length){
		$('.logout').on('click', ()=>{
			console.log(ajax.api.LOGOUT);
			ajax.post(ajax.api.LOGOUT, {})
				.then(res=>{
					console.log(res);
					if(res.result.code == 0){
						location.href = '/';
					}
				})
				.catch(err=>{
					console.log(res);
					location.href = '/';
				});
		});
	}
}