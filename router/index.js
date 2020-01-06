const router=require("koa-router")()

const list=require("./list/list")

router.use(list.routes(),list.allowedMethods())

module.exports=router;