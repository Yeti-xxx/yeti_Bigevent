$(function () {
    const layer = layui.layer;
    const form = layui.form;
    let index = 9999999;
    initArtCateList();

    //获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                const htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);

            }
        })

    }

    // 添加类别绑定事件
    $('#btnAddCate').on('click', function () {
        // index获取弹出层索引，用户之后关闭弹出层
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $('#dialog-add').html(), //jauery获取标签内的html结构
        });
    })

    //通过代理形式，为form-add绑定事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                } else {
                    layer.close(index);//关闭弹出层
                    initArtCateList();
                    layer.msg('新增分类成功')
                }
            }
        })

    })


    let indexedit = 99999;
    $('tbody').on('click', '#btn-edit', function (e) {
        // index获取弹出层索引，用户之后关闭弹出层
        indexedit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            , content: $('#dialog-edit').html(), //jauery获取标签内的html结构

        });
        const id = $(this).attr('data-id');
        //发起请求获取对应数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data);

            }

        })
    })

    //绑定修改分类的事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败');
                }
                layer.msg('更新分类数据成功');
                layer.close(indexedit);
                initArtCateList();

            }

        })
    })

    //绑定删除按钮
    $('tbody').on('click', '#btn-delete', function () {
        const id = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg('删除分类数据失败');
                }
                layer.msg('删除分类数据成功');
                initArtCateList();
            }
        })
    })

})