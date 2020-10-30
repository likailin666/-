//建立点击跳转页面的功能 
$('#link_reg').on('click', function() {
    // 显示隐藏相应盒子
    $('.login-box').hide()
    $('.reg-box').show()
})
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

//监听注册提交事件 $('') $(this)
$('#form_reg').on('submit', function(e) {
    // 阻止默认行为
    e.preventDefault()
        // 获取输入框的值
    var una = $('.reg-box [name=username]').val()
    var pwd = $('.reg-box [name=password]').val()
        // 发起post的请求
    $.post('/api/reguser', { username: una, password: pwd }, function(res) {
        //判断状态
        if (res.status !== 0) {
            return layer.msg(res.message)
        }
        console.log(res);
        layer.msg('注册成功,请登录!')
            // 注册成功后模拟手动点击
        $('#link_login').click()
    })
})

//监听登录提交事件 $('') $(this)
$('#form_login').on('submit', function(e) {
    e.preventDefault()
        // 新方法获取输入框的值
    var data1 = $('#form_login').serialize()
        // 发起ajax请求
    $.ajax({
        method: 'post',
        url: '/api/login',
        data: data1,
        success: function(res) {
            //判断状态
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('登录成功!')
                // 存储到本地
            localStorage.setItem('token', res.token)
                // 跳转到首页
            location.href = '/index.html'
        }
    })
})