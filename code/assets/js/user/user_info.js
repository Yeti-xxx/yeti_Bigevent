$(function () {
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度不得大于6个字符'
            }
        }

    })
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUser_info();


    })
    //监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        updateUser_info();
    })
    initUser_info();

    // 获取用户初始信息
    function initUser_info() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                // 调用form.val()为表单快速赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    function updateUser_info() {
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('修改用户信息失败')

                } else {
                    layer.msg('修改用户信息成功');
                    // 调用父页面方法，重新渲染头像和昵称信息
                    //window代表当前ifram parent代表index.html
                    window.parent.getUserInfo();
                }

            }
        })
    }


})
