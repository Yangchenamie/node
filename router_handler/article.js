const db = require('../db/index')
const path = require('path')

// 发布新文章
exports.addArticle = (req,res) =>{
    console.log(req.body) 
    // 文本类型的数据
    console.log('--------分割线----------') 
    console.log(req.file) 
    // 文件类型的数据 
    // 手动判断是否上传了文章封面 
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')
    const articleInfo = {
        //标题、内容、状态、所属的分类id
        ...req.body,
        //文章封面在服务器的存放路径
        cover_img: path.join('/uploads', req.file.fileldname),
        //发布的时间
        pub_date: new Date(),
        //文章作者的ID
        author_id: req.user.id,
    }
    const sql = 'insert into ev_articles set ? '
    db.query(sql, articleInfo, (err, results) => {
        //执行SQL语句失败
        if (err) {
            return res.cc(err);
        }
        //执行SQL语句成功，但是影响行数不等于1
        if (results.affectedRows !== 1) {
            return res.cc('发布文章失败！');
        }
        //发布文章成功
        res.cc('发布文章成功!');
    })

}