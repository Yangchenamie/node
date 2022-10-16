const express = require('express')

const router = express()

// 注意：使用 express.urlencoded() 中间件无法解析 multipart/form-data 格式的请求体数据。
const multer = require('multer')
const path = require('path')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

const{add_article_schema} = require('../schema/article')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径 
const upload = multer({ dest: path.join(__dirname, '../uploads') })

const articleRouter= require('../router_handler/article')

// 发布新文章
router.post('/add', upload.single('cover_img'),expressJoi(add_article_schema),articleRouter.addArticle)
module.exports = router