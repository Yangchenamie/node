const express = require("express");

// const userRouter = require('./router/user')

const joi = require('joi')
const app = express()

const cors = require('cors') 
app.use(cors())
// 通过如下的代码，配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件：
// 注意，这个中间件只能解析这种格式的表单数据 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// 一定要在路由模块之前
// 封装res.send()函数
app.use(function(req,res,next){
    res.cc = function(err,status = 1){
        res.send({
            status,
            message:err instanceof Error ? err.message:err
        })
    }
    next()
})

// 一定要在路由之前  配置解析 Token 的中间件
const config = require('./config')
const expressJWT = require('express-jwt')
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api\//]}))
// 导入并使用路由模块
const userRouter = require('./router/user');
const { jwtSecretKey } = require("./config");
const userinfoRouter = require('./router/userInfo')
const artCateRouter = require('./router/artcate')
const articleRouter = require('./router/article')

app.use('/api',userRouter)
app.use('/my',userinfoRouter)
app.use('/my/article',artCateRouter)
app.use('/my/article',articleRouter)
// 全局错误级别中间件
app.use(function(err,req,res,next){
    // 数据验证失败 
    if (err instanceof joi.ValidationError) return res.cc(err) 
    // 捕获身份认证失败
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知错误 
    res.cc(err)
})

app.listen(3007,function(){
    console.log('api server running at http://127.0.0.1:3007');
})