$(function () {
    // 1.1 获取裁剪区域的 DOM 元素\
    const layer = layui.layer;
    const $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview',
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    // 为上传文件按钮绑定事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    });

    // 监听文件按钮是否图片发生改变
    $('#file').on('change', function (e) {
        const filelist = e.target.files;
        // 获取图片
        const file = e.target.files[0];
        //为图片创建路径
        const newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options);       // 重新初始化裁剪区域

    })

    // 确定按钮绑定事件
    $('#btnUpload').on('click', function () {
        const dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');      // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败');
                }
                layer.msg('更换头像成功')
                window.parent.getUserInfo();
            }
        })
    })

})
