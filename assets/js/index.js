$(function () {
    // 调用 getUserInfo() 获取用户的基本信息
    getUserInfo()
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: "GET",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            console.log(res);
        }
    })
}