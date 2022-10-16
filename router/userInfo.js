const express = require('express')

const router = express()
const userinfo_handler = require('../router_handler/userInfo')

const expressJoi = require('@escook/express-joi')

const {update_userinfo_schema} = require('../schema/user')

const{update_password_schema} = require('../schema/user')

const{update_pic_schema} = require('../schema/user')
// 获取用户信息
router.get('/userinfo',userinfo_handler.getUserInfo)

// 更新用户信息
router.post('/userinfo',expressJoi(update_userinfo_schema),userinfo_handler.updateUserInfo)

// 更改用户密码
router.post('/updatepwd',expressJoi(update_password_schema),userinfo_handler.updatePwd)

// 更改用户头像
router.post('/update/avatar',expressJoi(update_pic_schema),userinfo_handler.updatePic)

module.exports = router