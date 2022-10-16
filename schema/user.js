// 1.
const joi = require('joi')

const usename = joi.string().alphanum().min(1).max(10).required()

const password = joi.string().pattern(/^[\S]{6,12}$/).required()

exports.reg_login_schema = {
    body:{
        usename,
        password
    }
}

// 2.更新用户信息
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

exports.update_userinfo_schema = {
    body:{
        id,
        nickname,
        email
    }
}

// 更改用户密码
exports.update_password_schema = {
    body:{
        oldPwd:password,
        newPwd:joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// 更改用户头像
// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()
exports.update_pic_schema = {
    body:{
        avatar
    }
}