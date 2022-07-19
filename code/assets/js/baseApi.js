// 统一拼接路劲
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    //统一为有权限接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token'),
        };
    }
    //全局统一挂载complete
    options.complete = function (res) {
        if (res.responseJSON.status === 1) {
            //清空本地token
            localStorage.removeItem('token');
            //跳转登录页面
            location.href = '/Node.js/0大事件前端/code/login.html'
        }
    }
})

