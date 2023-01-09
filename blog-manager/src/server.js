const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 
const MongoClient = require('mongodb').MongoClient;
app.set('veiw engine','ejs')
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
require('dotenv').config()

var todoapp = null;

const url = process.env.DB_URL;

MongoClient.connect(url,function(err,clinet){

    if(err) return console.log(err)

    todoapp = clinet.db('todoapp');
    
    app.listen(process.env.PORT, function(){
        console.log(process.env.PORT)
    })
});


app.get('/write',function(res, ans){
    ans.sendFile(__dirname + '/index.html')
})


app.get('/list',(res, ans)=>{
    todoapp.collection('post').find().toArray( (err,result)=>{
        console.log(result)
        ans.render('list.ejs', {posts: result})
    });
})


app.get('/edit/:id', (req, res)=>{
    todoapp.collection('post').findOne({_id:parseInt(req.params.id)}, (err,result)=>{
        res.render('edit.ejs', {post: result})
    })
})


app.put('/edit', (req,res)=>{
    todoapp
      .collection("post")
      .updateOne(
        { _id: parseInt(req.body.id) },
        { $set: { 제목: req.body.title, 날짜: req.body.data } },
        (err, result) => {
            console.log('수정완료')
            res.redirect('/list')
        }
      );
})
//form action = "/edit?_method=PUT" method="POST"

// input name ="id" value = id값 style = "display:none"

// 꺼낼 때, res.body.name의값(id) // parseInt 쓰기

app.post('/add',function(res,ans){
    ans.send('전송완료') 

    todoapp.collection('count').findOne({name: '게시물갯수'}, (err, result)=>{
        console.log(result.totalPost)
        var totalPost = result.totalPost 
 
        todoapp.collection('post').insertOne({_id : totalPost+1, 제목: res.body.title, 날짜 : res.body.date}, ()=>{
            console.log('저장완료');
            todoapp.collection('count').updateOne({name:'게시물갯수'},{ $inc: {totalPost:1}},(err, result)=>{
                if(err) return console.log(err);
                console.log('업데이트 완료');
            })
        })
    })
})

app.delete('/delete', (res, req)=>{
    console.log(res.body)
    todoapp.collection('post').deleteOne({_id: parseInt(res.body._id)},(err, result)=>{
        console.log('삭제완료');
        req.status(200).send({message:'성공함'})
    })
})

// operator 연산자  $inc $set..


const isLogin = (req, res, next) => {
    if(req.user){
        next()
    } else{
        res.send('로그인 왜 안 함')
    }
}

app.get('/mypage', isLogin, (req,res)=>{
    console.log(req.user)
    res.render('mypage.ejs')
})



const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 


app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

app.post('/login', passport.authenticate('local',{
    failureRedirect : '/fail'
}),(req,res)=>{
    res.redirect('/mypage')
})

passport.use(new LocalStrategy({
    usernameField: 'id', //name = "id"
    passwordField: 'pw', //name = "pw"
    session: true, //저장할 건지
    passReqToCallback: false, //id pw 외의 것들을 볼 것인가
  }, function (입력한아이디, 입력한비번, done) {
    //console.log(입력한아이디, 입력한비번);
    todoapp.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
      if (에러) return done(에러)
  
      if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
      if (입력한비번 == 결과.pw) {
        return done(null, 결과)
      } else {
        return done(null, false, { message: '비번틀렸어요' })
      }
    })
  }));

passport.serializeUser(function (user, done) {
    done(null, user.id)
});


// 로그인한 유저의 세션 아이디를 바탕으로 개인정보를 DB에서 찾는 역할
passport.deserializeUser(function (아이디, done) {
    todoapp.collection('login').findOne({id : 아이디}, (err,result)=>{
        done(null, result)
    })
    done(null, {})
}); 


app.post('/register', (req,res)=>{
    todoapp.collection('login').insertOne({id:req.body.id, pw : req.body.pw},(err,result)=>{
        res.redirect('/mypage')
    })
})