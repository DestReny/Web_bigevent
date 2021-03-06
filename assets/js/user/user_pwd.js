$(function () {
  var form = layui.form

  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须 6-12 位，且不能出现空格"],
    samePwd: function (value) {
      if (value === $("[name=oldPwd]").val()) {
        return '新旧密码不能一致！'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return "两次密码不一致！"
      }
    }
  })

  $(".layui-form").on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('更新密码失败！')
        }
        layui.layer.msg('更新密码成功！')
        // 重置表单
        // [0] 将jQuery对象转换成原生JS对象
        $('.layui-form')[0].reset()
        // 用户修改密码成功后返回到登录页面
        top.location.href = '/login.html'
      }
    })
  })
})