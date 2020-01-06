const koa=require("koa")
const app=new koa()

const bodyParser=require("koa-bodyparser")
const router=require("./router/index.js")

const path=require("path")
const static=require("koa-static")

app.use(bodyParser())
app.use(router.routes(),router.allowedMethods())
app.use(static(path.join(__dirname,"./public/index.html")))

app.listen(9000)