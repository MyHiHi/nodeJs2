var express  =require('express')
var fs = require('fs')
const exp = new express()
var fs = require('fs')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var mongoApi = require('./mongoApi')
exp.use('/static',express.static('../static'));
exp.use(express.static('../static'));
exp.use(bodyParser.urlencoded({extended:false}));
exp.use(bodyParser.json());
exp.use(cookieParser('signed'))
exp.set('view engine','ejs')
var cmod=1;


exp.get('/city',(req,res)=>{
    var city = req.query.city
    var cities = req.cookies.city
    if (cities){
        cities.push(city)
    }else{
       
        cities=[]
        cities.push(city)
    }
    res.cookie('city',cities,{maxAge:60*1000*10,signed:true})
    res.send('ok')
    
})
exp.get('/travel',(req,res)=>{
    // res.send('浏览过的城市 :'+req.query.city)
    res.send('浏览过的城市 :'+req.cookies.city)
})
exp.get('/set',(req,res)=>{
    res.cookie('username','cookie',{maxAge:600000,path:'/news',singed:true})
    res.send('set cookie successfully!')
})
exp.get('/login2',(req,res)=>{
    console.log(req.cookies)
    res.render('login')
})
exp.post('/doLogin',(req,res)=>{
    var name = req.body.name
    var pwd  = req.body.pwd
    var data = {name:name,'pwd':pwd}
    mongoApi.insertMongo(data)
})

exp.get('/news',(req,res,next)=>{
        if (cmod){
            next();
        }else{
            res.send('forbiden')
            console.log('****forbiden***')
        }
})
exp.get('/news',(req,res)=>{
    res.send('This is News')
})
exp.use('/register',(req,res)=>{
    res.send('Register Page')
})

exp.use((req,res,next)=>{
    // res.send('万能匹配。。');
    // console.log('*********',new Date())
    next();
})
exp.get('/news/:id',(req,res)=>{
    var info   = fs.readFileSync('../static/404.html').toString()
    res.send(info)
   console.log(typeof req.params.id)
})
exp.get('/login',(req,res)=>{
   
    res.send('<h1>login</h1>')
    console.log(req.query)
   console.log(typeof req.params.id)

})
exp.use((req,res)=>{
    res.status(404).send('Not Found')
})

exp.listen(8000,'127.0.0.1')