const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const methodOverride = require('method-override');
const updateRank = require('./module/updateRank')

var cors = require('cors');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true})) 
app.use(express.json());
app.use(cors());

require('dotenv').config()




const url = process.env.DB_URL;
var db;


MongoClient.connect(url,function(err,clinet){

    if(err) return console.error(err)

    db = clinet.db('blog-manager');

    app.listen(process.env.PORT)
});



app.use(express.static(path.join(__dirname, '/build/')));

app.get('/',function(req, res){
    res.sendFile(__dirname + '/build/index.html')
})



app.post('/add',async (req,res) => {

    try {
        const dataNum = await db.collection('count').findOne({name: 'dataNum'})

        var totalPost = dataNum.totalPost;
        var keywords = req.body.keywords.replace(" ").split(',');

        db.collection('count').updateOne({name:'dataNum'},{ $inc: {totalPost:1}})
        db.collection('user').updateOne({id: req.body.id},{ $push: {data: totalPost+1}});

        updateRank(keywords)

        res.redirect('/myPage/'+req.body.id);
    }
    catch (err) {
        console.error(err);
    }

})


app.get('/list',(req,res)=>{
    db.collection('data').find().toArray((err,result)=>{
        if(err) return err
        res.send(result)
    })
})

app.delete('/list',(req, res)=>{
    db.collection('data').deleteOne({_id: parseInt(req.body._id)},(err,result)=>{
        console.log('삭제함')
        res.status(200);
    })
})

app.post('/register',(req, res)=>{
    db.collection('user').insertOne({id: req.body.id, pw: req.body.pw, data: []},(err,result)=>{
        console.log('등록함')
        res.redirect("/login")
    })
})




app.post('/login', passport.authenticate('local',{
    failureRedirect: '/login'
}),(req, res)=>{
    res.redirect('/')
})

app.get('/user',isLogin,(req, res)=>{
    res.send(req.user)
})

const isLogin = (req, res, next) => {
    if (req.user){
        next()
    } else {
        res.send(false)
    }
}




const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
  }, (id, pw, done) => {
    db.collection('user').findOne({ id: id }, function (err, result) {
      if (err) return done(err)

      if (!result) return done(null, false, { message: '존재하지않는 아이디요' });
      
      if (pw == result.pw) {
        return done(null, result)
      } else {
        return done(null, false, { message: '비번틀렸어요' })
      }
    })
}));


//세션등록하기
passport.serializeUser((user, done)=>{
    done(null, user.id)
})


passport.deserializeUser((id, done)=>{
    db.collection('user').findOne({id:id}, (err, result)=>{
        done(null, result)
    })
})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
  });