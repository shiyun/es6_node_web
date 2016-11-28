'use strict';
import ajax from './util/ajax'
import setBg from './util/setBg'
import logout from './util/logout'

setBg();
logout();

const tbody = $('#tbody');

const status = ['已申请', '出证中', '已出证'];

ajax.post(ajax.api.TESTIFYLIST, {}, {token: true, secret: false})
	.then(res=>{
		console.log(res);
		if(res.result.code == '0'){
			let data = JSON.parse(res.content.data);
			tbody.html(renderList(data));
		}else{
			alert(res.result.description);
		}
	})
	.catch(err=>{
		console.log(err);
		alert('数据请求失败');
	});

function renderList(data){
	let _html = '';
	$.each(data, (i)=>{
		let state = data[i].state, stateName = '', cname = '';
		switch(state){
			case 0:
				stateName = status[0];
				break;
			case 1:
				stateName = status[1];
				cname = ' cblue';
				break;
			case 2:
				stateName = status[2];
				break;
		}
		_html += `<tr>
					<td>${data[i].identify}</td>
					<td><p class="dnaWrap">${data[i].dna}</p></td>
					<td><p class="fileWrap">${data[i].fileName}</p></td>
					<td>${data[i].applyDateString}</td>
					<td><span class="status-cz${cname}">${stateName}</span></td>
				</tr>`;
	});
	return _html;
}	