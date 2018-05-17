var mongoUrl = 'mongodb://127.0.0.1:27017'
var mongo  = require('mongodb')
var dbName = 'admin',tName = 'user6';



insertMongo=(data)=>{
    var db = getDB()
        db.insert(data,(err,msg)=>{
                if (err) console.log('插入失败')
                else console.log('插入成功')
        })
}


function getDB (){
    mongo.connect(mongoUrl,(err,client)=>{
        if (err) {
            console.log('连接数据库失败')
            return ;
        }else{
            return  client.db(dbName).collection(tName)
        }
    })
}

module.exports.insertMongo = insertMongo