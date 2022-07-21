$(function () {
    getUserInfo();

})
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            else {
                renderAvatar(res.data);
            }
        },
        

    })

}
//渲染头像函数
function renderAvatar(user) {
    const name = user.nickname || user.username;
    $('#welcome').html('欢迎 ' + name);
    //按需渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avater').hide();
    } else {
        $('.layui-nav-img').hide();
        //渲染文本头像
        const firstword = name[0].toUpperCase();
        $('.text-avater').html(firstword).show();
    }
}

//退出功能
$('#btnlogout').on('click', function () {
    //清空本地token
    localStorage.removeItem('token');
    //跳转登录页面
    location.href = '/Node.js/0大事件前端/code/login.html'

})