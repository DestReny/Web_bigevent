$(function () {
  initArtCateList()

  // 获取文章分类的列表
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        var htmlStr = template('tpl-table', res)
        $("tbody").html(htmlStr)
      }
    })
  }

  // 为添加类别按钮添加点击事件
  var indexAdd = null;
  $('#btnAddCate').on('click', function () {
    indexAdd = layui.layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '添加文章分类',
      content: $("#dialog-add").html()
    })
  })

  // 通过代理的形式，为 form-add 表单绑定 submit 事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('新增分类失败！')
        }
        initArtCateList()
        layui.layer.msg('新增分类成功！')
        // 根据索引，关闭弹出层
        layui.layer.close(indexAdd)
      }
    })
  })

  // 通过代理的形式，为 btn-edit 按钮绑定点击事件
  var indexEdit = null;
  $("tbody").on('click', '.btn-edit', function () {
    // 弹出一个修改文章分类信息的层
    indexEdit = layui.layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $("#dialog-edit").html()
    })

    var id = $(this).attr('data-id')
    var name = $(this).attr('data-name')
    var alias = $(this).attr('data-alias')
    // console.log(id, name, alias);
    layui.form.val('form-edit', {
      Id: id,
      name: name,
      alias: alias
    })
    // 发起 ajax 请求获取对应分类的数据
    // $.ajax({
    //   method: 'GET',
    //   url: '/my/article/cates/' + id,
    //   success: function (res) {
    //     layui.form.val('form-edit', res.data)
    //   }
    // })
  })

  // 通过代理的形式，为修改的分类表单绑定 submit 事件
  $("body").on('submit', "#form-edit", function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("更新分类数据失败！")
        }
        layui.layer.close(indexEdit)
        layui.layer.msg('更新分类数据成功！')
        initArtCateList()
      }
    })
  })

  // 通过代理的形式，为删除按钮绑定点击事件
  $("tbody").on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')
    // 提示用户是否要删除
    layui.layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layui.layer.msg("删除分类失败！")
          }
          layui.layer.msg('删除分类成功！')
          layui.layer.close(index)
          initArtCateList()
        }
      })
    })
  })
})