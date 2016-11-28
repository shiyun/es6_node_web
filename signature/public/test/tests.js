var createNumRand = function(n){
	var str = '';
	for(var i=0; i<n; i++){
		str+=Math.floor(Math.random()*10);
	}
	return str;
};

QUnit.test("LOGIN 接口测试", function(assert) {
    var done = assert.async();
	ajax.post(ajax.api.LOGIN,
		 {"organizeId":"1004","secret":"C6F215DAB70B852CED70853BE873DE3B"},
		function(response){			
			assert.ok(true, JSON.stringify(response));
			done();					
		},
		function(err){
			assert.ok(false, "LOGIN 失败" );
			done();
		});
	   
});
