// 导入数据库
const db = require('../db/index')

// 导入bcryptjs
const bcryptjs = require('bcryptjs')

// 获取用户基本信息的处理函数
exports.getUserInfo =(req,res) =>  {
    const sql = 'select  id, usename, nickname, email, user_pic from ev_users where id=?'
    db.query(sql,req.user.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('获取用户信息失败！')
        res.send({
            status:0,
            message:'获取用户基本信息成功！',
            data:results[0]
        })
    })
}

// 更新用户信息
exports.updateUserInfo = (req,res) => {
    const sql = 'update ev_users set ? where id=?'
    db.query(sql,[req.body,req.body.id],(err,results) => {
        // 执行sql语句失败
        if(err){ 
            return res.cc(err)
        }
        // 执行sql语句成功，但更新失败
        if(results.affectedRows !== 1){
            return res.cc('更新用户信息失败！')
        }
        // 成功
        res.cc('更新用户信息成功！',0)
        
    })
}

// 更改用户密码
exports.updatePwd = (req,res) => {
    const sql = 'select * from ev_users where id=?'
    db.query(sql,req.user.id,(err,results) => {
        if(err) {
            return res.cc(err)
        }

        if(results.length !== 1){
            return res.cc('用户不存在！')
        }
        // 判断提交的旧密码是否正确
        const compareResults = bcryptjs.compareSync(req.body.oldPwd,results[0].password)
        if(!compareResults){
            res.cc('原密码错误！')
        }

        // 更新用户密码
        const sql = 'update ev_users set password=? where id=?'
        const newPwd = bcryptjs.hashSync(req.body.newPwd)
        db.query(sql,[newPwd,req.user.id],(err,results) => {

            if(err){
                return res.cc(err)
            }

            if(results.affectedRows !==1){
                return res.cc('更新密码失败！')
            }
            res.cc('更新密码成功！')
        })
    })
}

// 更改用户头像
exports.updatePic =(req,res) =>{
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql,[req.body.avatar, req.user.id],(err,results) =>{
        
        if(err) return res.cc(err)

        if(results.affectedRows !==1) return res.cc('更新头像失败！')
        res.cc('更新头像成功！',0)
    })
}