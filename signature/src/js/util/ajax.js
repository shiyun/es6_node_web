import _ from 'lodash';

class AJAX {
    constructor(){
        this.API_URL = 'API_URL';
        this.api = {
            LOGIN             : "/api/login",          
            LOGOUT            : "/api/logout",          
            INFOADD           : "/api/" + this.API_URL + "/infoAdd",     //平台信息补全     
            VERIFYPDF         : "/api/" + this.API_URL + "/verifyPDF",   //在线验签    
            VERIFYUNIQUECODE  : "/api/" + this.API_URL + "/verifyUniqueCode",   //根据唯一标识符查询是否有存证信息 
            APPLYFORTESTIFY   : "/api/" + this.API_URL + "/applyForTestify",   //申请出证接口
            TESTIFYLIST       : "/api/" + this.API_URL + "/testifyList",   //申请出证列表
        }
    }

    get(url, data, options){
        return this.ajax(url, "GET", data, options);
    }

    post(url, data, options){
        return this.ajax(url, "POST", data, options);
    }

    ajax(url, type, data, options){
        let promise = new Promise((resolve, reject)=>{
            let _url = url.indexOf('?') > -1 ? url : url + '?';
            _url += "nonce=" + Date.now();
            if(options){
                _.forEach(options, (v, k)=>{
                    _url += '&' + k + '=' + v;
                });
            }
            $.ajax({
                type: type,
                url: _url,
                data: data,            
                success: (res)=>{resolve(res);},
                error: (err)=>{reject(err);},
                dataType: "json"
            });
        });   
        return promise;     
    }
}

module.exports = new AJAX();