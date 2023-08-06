var express = require('express');
var nodemon = require("nodemon");
var bodyparser = require("body-parser");
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended  : true
}))

mongoose.connect('mongodb://127.0.0.1:27017/mydb',{
    useNewUrlparser:true,
    useUnifiedTopology:true
});

var db = mongoose.connection;

db.on('error',()=>console.log("error in connecting database"))
db.once('open',()=>console.log("connected to database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name":name,
        "email":email,
        "phno":phno,
        "password":password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record successfully inserted");
    })
    return res.redirect('signup_success.html')
})

app.get('/',(req,res)=>{
    res.set({
        " Allow-acess-allow-origin":'*'
    })
    return res.redirect('index.html')
}).listen(5555);
console.log("listenng to PORT 5555");