var AJAX = function(){
    var get = function(url, data, success, error, options){
        ajax(url, "GET", data, success, error, options);
    };
    var post = function(url, data, success, error, options){
        ajax(url, "POST", data, success, error, options);
    };
    var ajax = function(url, type, data, success, error, options){
        var __url = url.indexOf("?") > -1 ? url : url + "?";
        __url += "nonce=" + Date.parse(new Date());
        if(options){
            for (var k in options){
                __url += "&" + k + "=" + options[k];
            }
        }
        var __error = error?error:function(e){
            if(error)error(e);
            else alert(JSON.stringify(e));
        };
		//console.log(__url);
        $.ajax({
            type: type,
            url: __url,
            data: data,
            success: success,
            error: __error,
            dataType: "json"
        });
    };
    var FABAO_WEBSITE = "FABAO_WEBSITE";
    return {
        get:get,
        post:post,
        ajax:ajax,
        base:{
            FABAO_WEBSITE:FABAO_WEBSITE
        },
        api:{
            GET_NEWS_INFO      : "/api/" + FABAO_WEBSITE + "/news/getnewsinfo",
			GET_NEWS_LIST      : "/api/" + FABAO_WEBSITE + "/news/getnewslist",
			GET_NEWS_DETAIL    : "/api/" + FABAO_WEBSITE + "/news/getnewsdetail",
			GET_NEWS_RECENT    : "/api/" + FABAO_WEBSITE + "/news/getrecentnews",
			GET_JOBS_INFO	   : "/api/" + FABAO_WEBSITE + "/job/getjobinfo",
			GET_INVENTOR_INFO  : "/api/" + FABAO_WEBSITE + "/resource/getinventorinfo"
        }
    };
};