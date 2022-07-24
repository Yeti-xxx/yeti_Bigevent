$(function () {
    const layer = layui.layer;
    const form = layui.form;
    //获取文章类别
    initCate();
    // 初始化富文本编辑器
    initEditor()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章类别失败');
                }
                // 调用模板引擎渲染
                const htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }

        })

    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        // aspectRatio: 400 / 280,  此处注释 裁剪相对比例取消
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $('#pub-fm').on('click', function () {
        $('#coverFile').click();

        // 监听coverFile change事件
        $('#coverFile').on('change', function (e) {
            // 拿到用户选择的文件
            var file = e.target.files[0]
            // 根据选择的文件，创建一个对应的 URL地址
            var newImgURL = URL.createObjectURL(file)
            // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', newImgURL)  // 重新设置图片路径
                .cropper(options)        // 重新初始化裁剪区域
        })


    })

    // 定义文章发布状态
    let art_status = '已发布';
    // 草稿按钮绑定事件
    $('#btnSave2').on('click', function () {
        art_status = '草稿';
    })

    // 为表单绑定提交事件
    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        // 基于form 创建form对象
        const fd = new FormData($(this)[0]);
        // 存入文章发布状态
        fd.append('status', art_status);
        // 将封面图片转化为文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 将文件存储到fd对象中
                fd.append('cover_img',blob);
            
            })
        // 发起ajax 提交文章
        publishArticle(fd);

    })

    //发布文章方法
    function publishArticle(fd){
        console.log(fd);
        $.ajax({
            method:'POST',
            url:'/my/article/add',
            data:fd,
            // 如果向服务器提交foreData数据
            // 必须添加下面两个配置
            contentType:false,
            processData:false,
            success:function(res){
                console.log(res);
                if (res.status!==0) {
                    return layer.msg('操作失败')
                }
                layer.msg('操作成功')
            }
        })
    }

})