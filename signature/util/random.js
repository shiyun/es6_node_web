const chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const createRand = (n) => {
	let char = '';
	for (var i=0; i<n; i++){
		char += chars[Math.ceil(Math.random()*35)]
	}
	return char;
};

const createNumRand = (n) => {
	let str = '';
	for(var i=0; i<n; i++){
		str+=Math.floor(Math.random()*10);
	}
	return str;
}

module.exports = {
	createRand,
	createNumRand
};