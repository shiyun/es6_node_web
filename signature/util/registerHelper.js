const fs = require('fs');

const norender = (path, cb) => {
  fs.exists(path, (exists)=>{
    if(exists){
      fs.readFile(path, 'utf-8', (data)=>{
        cb(data);
      })
    }else{
      console.log('no such file');
    }
  });
}

const isEqual = (a, b, options) => {
  return a === b ? options.fn() : options.inverse();  
}

const width = (context, options) => {
  return options.fn(context);
}

const isEqual2 = (a, b, context, options) => {
  if(typeof context === 'string') context = JSON.parse(context);
  return a === b ? options.fn(context) : options.inverse(context);
}

const orgType = (type) => {
  switch(type){
    case 0:
      return '普通企业';
    case 1:
      return '社会团体';
    case 2:
      return '事业单位';
    case 3:
      return '民办非企业单位';     
    case 4:
      return '党政及国家机构';      
  }
}

module.exports = {
  isEqual,
  norender,
  orgType,
  width,
  isEqual2
}