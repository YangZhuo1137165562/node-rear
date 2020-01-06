const router = require("koa-router")()
const query = require("../../db/query.js")
// router.prefix("/msg/")//公共
router.get("/alluser", async ctx => {//查找全部用户信息
    let res = await query('select * from usermsg')
    if (res.length > 0) {
        ctx.body = {
            code: 1,
            mes: "已成功获取全部数据",
            data: res
        }
    } else {
        ctx.body = {
            code: 0,
            mes: "无法获取全部数据"
        }
    }
})
router.post("/adduser", async ctx => {//增加用户
    let { name, phone } = ctx.request.body
    let userdata = await query(`select * from usermsg where name='${name}'`)
    console.log(userdata);
    if (userdata.length == 0) {//没有该用户，用长度判断
        let res = await query(`insert into usermsg (name,phone) values ('${name}','${phone}')`)
        if (res.affectedRows == 1) {
            ctx.body = {
                code: 1,
                msg: "添加成功"
            }
        } else {
            ctx.body = {
                code: 0,
                msg: "添加失败"
            }
        }
    } else {
        ctx.body = {
            code: 0,
            msg: "已有该用户"
        }
    }

})
router.get("/delete", async ctx => {
    let { id } = ctx.request.query
    let res = await query(`delete from usermsg where id='${id}'`)
    if (res.affectedRows == 1) {
        ctx.body = {
            code: 1,
            msg: "删除成功"
        }
    } else {
        ctx.body = {
            code: 0,
            msg: "删除失败"
        }
    }
})
router.post("/update", async ctx => {
    let { name, phone, id } = ctx.request.body
    let res = await query(`update usermsg set name='${name}',phone='${phone}' where id='${id}'`)
    if (res.affectedRows == 1) {
        ctx.body = {
            code: 1,
            msg: "编辑成功"
        }
    } else {
        ctx.body = {
            code: 0,
            msg: "编辑失败"
        }
    }
})

router.get('/search', async ctx => {
    let { name } = ctx.request.query
    let res = await query(`select * from usermsg where name like '%${name}%'`)
    if (res.length > 0) {
        ctx.body = {
            code: 1,
            msg: "可以查询到",
            data: res
        }
    } else {
        ctx.body = {
            code: 0,
            msg: "没有查询到",
            data:res
        }
    }

})
module.exports = router;