// 导入表单验证规则
const joi = require('joi')

// 定义
const name = joi.string().required()
const alias = joi.string().alphanum().required()
exports.add_cate_schema ={
    body:{
        name,
        alias
    }
}

// 删除分类
    // 注意： integer()代表整数
const id = joi.number().integer().min(1).required()
exports.delete_cate_schema = {
    // 注意：params
    params:{
        id
    }
}

// 根据 Id 获取文章分类

exports.get_cate_schema = {
    // 注意：params
    params:{
        id
    }
}

// 更新文章分类
exports.update_cate_schema = {
    body:{
        id,
        name,
        alias
    }
}