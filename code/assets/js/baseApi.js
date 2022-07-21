// 统一拼接路劲
$.ajaxPrefilter(function (options) {
    console.log(options.url);
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    //统一为有权限接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token'),
        };
    }
    
    //全局统一挂载complete
    options.complete = function (res) {
        console.log(res);
        if (res.responseJSON) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //清空本地token
                localStorage.removeItem('token');
                //跳转登录页面
                location.href = '/Node.js/0大事件前端/code/login.html'
            }
        }

    }
})

