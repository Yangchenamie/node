// 数据库
const db = require('../db/index')
// 加密
const bcrypt = require('bcryptjs')
// token
const jwt = require('jsonwebtoken')
// 注册
exports.regUser = (req,res)=>{
    // 获取客户端提交到服务器的信息
    const useInfo = req.body
    // console.log(useInfo);
    // 对表单中的数据，进行合法的校验
    if(!useInfo.usename ||!useInfo.password){
        // return res.send({ status : 1,message:'用户名或密码不能为空！'})
        return res.cc('用户名或密码不能为空！')
    }

    // 定义sql语句
    const sql = 'select * from ev_users where usename=?'
    
    db.query(sql,[useInfo.usename],function(err,results){
        if(err){
            // return res.send({ status:1,message:err.message})
            return res.cc(err.message)
        }
        if(results.length > 0){
        //    return  res.send({ status:1,message:'用户名被占用，请更换其他用户名！'})
            return res.cc('用户名被占用，请更换其他用户名！')
        }

        // 对密码进行加密，使用bcrypt的hashSync（）函数
        // console.log(useInfo.password);
        useInfo.password = bcrypt.hashSync(useInfo.password,10)
        // console.log(useInfo.password);
        // TODO: 用户名可用，继续后续流程...

        // 定义插入新用户的sql语句
        const sql = 'insert into ev_users set ?'
        db.query(sql,{usename:useInfo.usename,password:useInfo.password},function(err,results){
            if(err){
                // return res.send({ status:1,message:err.message})
                return res.cc(err.message)
            }
            if(results.affectedRows !== 1){
                // return res.send({ status:1, message:'注册用户失败，请稍后再试！'})
                return res.cc('注册用户失败，请稍后再试！')
            }
            // res.send({ status:0, message:'注册用户成功！'})
            res.cc('注册用户成功！',0)
        })
    })

}
// 登录函数
exports.login = (req,res)=>{
    const useInfo = req.body
    const sql = 'select * from ev_users where usename=?'
    db.query(sql,useInfo.usename,(err,results) => {
        // 执行 SQL 语句失败
        if(err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if(results.length !== 1) return res.cc('登录失败！')
        // TODO：判断用户输入的登录密码是否和数据库中的密码一致

        //  拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(useInfo.password,results[0].password)

        if(!compareResult){
            return res.cc('登录失败1！')
        }

        // TODO：登录成功，生成 Token 字符串
        const user = {...results[0],password:'',user_pic:''}
        const config = require('../config')
        
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
        console.log(tokenStr);
        res.send({
            status:0,
            message:'登录成功！',
            token:'Bearer '+tokenStr
        })
    })
    
}