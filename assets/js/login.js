$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义校验规则
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        // 自定义密码的校验规则
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 自定义二次确认密码的单独校验规则
        repwd: function(value) {
            // 获取第一次密码的值
            var pwd = $('.reg-box [name="password"]').val()
            if (pwd !== value) {
                return '您两次输入的密码不一致'
            }
        }
    })

})