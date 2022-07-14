$(function () {
    //点击前往注册
    $('#link_reg').on('click', function () {
        console.log(11);
        $('.login-box').hide();
        $('.reg-box').show();

    })

    $('#link_login').on('click', function () {

        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 从layui获取对象
    const form = layui.form;
    const layer = layui.layer;
    // 通过form.verify()自定义校验规则
    form.verify({
        // 密码校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，不包含空格'],
        //校验两次密码是否相等
        regpwd: function (value) {
            // value获取确认密码框的值
            //进行判断
            pwdVal = $('.reg-box [name=password]').val();
            if (pwdVal !== value) {
                return '两次密码不一致！'
            }
        }
    })

    //监听注册表单事件
    const regdata = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
    };
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post('http://www.liulongbin.top:3007/api/reguser',
            data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                } else {
                    layer.msg('注册成功！');
                    //模拟点击登录链接
                    $('#link_login').click();
                }
            })
    })

    //监听登录表单事件
        $('#form_login').on('submit', function (e) {
            e.preventDefault();
            $.ajax({
                url: '/api/login',
                method: 'POST',
                //快速获取表单数据
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('登录失败');
                    } else {
                        layer.msg('登录成功');
                        localStorage.setItem('token',res.token);
                        location.href = '/Node.js/0大事件前端/code/index.html';
                    }
                }
            })
        })

})