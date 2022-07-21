$(function () {
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        samepwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码与旧密码不能相同!';

            }
        },
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '新密码与确认密码不相同!';

            }
        }

    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改密码失败');
                    
                } else {
                    layer.msg('修改密码成功');
                    //重置表单
                    $('.layui-form')[0].reset();
                }

            }
        })
    })
})