const success = (result) => {
  return {result: {code: 0, description: ""}, content: result}
}

const fail = (desp, result, code) => {
  code = code || -1;
  return {result: {code: code, description: desp}, content: result} 
}

module.exports = {
  success,
  fail
}