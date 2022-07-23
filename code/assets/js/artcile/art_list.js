$(function () {
    const layer = layui.layer;
    const form = layui.form;
    const laypage = layui.laypage;

    // 定义一个查询对象
    let q = {
        pagenum: 1,  //页码，默认请求第一页
        pagesize: 2, //每页显示条数，默认为2
        cate_id: '', //文章分类Id
        state: '',   //文章发布状态


    }
    initTable();
    initCate();

    //获取文章列表数据
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败');
                }
                layer.msg('获取文章列表成功');
                // 模板引擎渲染列表
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr);
                //调用渲染方法
                renderPage(100);
            }

        })
    };

    //获取分类数据
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败');
                }
                // 模板引擎渲染列表
                let htmlStr = template('tpl-cate', res);
                $('select').html(htmlStr);
                form.render('select', 'select1');  //通知layui重新渲染下拉框

            }
        })

    }

    //筛选表单表单事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        //获取下拉框中的值

        const cate_id = $('[name=cate_id]').val();
        const state = $('[name=state]').val();
        //为查询对象装配值
        q.state = state;
        q.cate_id = cate_id;
        //根据最新条件，重新渲染表格
        initTable();

    })

    //定义分页方法
    function renderPage(total) {
        //调用layerpage.render()方法来渲染分页结构
        laypage.render({
            elem: 'pageBox', //此处填id 不加#
            count: total,    //分页总数
            limit: q.pagesize,//每页页数
            curr: q.pagenum, //选中的页数
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5,10,20],
            jump: function (obj,first) {    //分页发生切换时，触发jump回调
                q.pagenum = obj.curr;   //将最新页码赋值到对象中
                q.pagesize = obj.limit;
                if (!first) {//避免jump死循环
                    initTable();
                }
            }
        })
    }

})