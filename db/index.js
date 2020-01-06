// 连接数据库
const mysql=require("mysql")

const connect=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"win"
})

connect.connect((err)=>{
    if(!err){
        console.log("数据库连接成功");
    }else{
        console.log("数据库连接失败");
    }
})

module.exports=connect;