const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({extended: true})) 

const MongoClient = require('mongodb').MongoClient;
app.set('veiw engine','ejs')
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
require('dotenv').config()

app.use(express.json());
var cors = require('cors');
app.use(cors());

var db;

const url = process.env.DB_URL;

MongoClient.connect(url,function(err,clinet){

    if(err) return console.log(err)

    db = clinet.db('blog-manager');
    
    app.listen(process.env.PORT, function(){
        console.log(process.env.PORT)
    })
});

app.use(express.static(path.join(__dirname, '/build/')));

app.get('/',function(req, res){
    res.sendFile(__dirname + '/build/index.html')
})

const axios = require("axios")
const cheerio = require("cheerio");
const schedule = require('node-schedule');
// /add로 db에 때려 넣기

app.post('/add',function(req,res){

    db.collection('count').findOne({name: 'dataNum'}, (err, result)=>{
        console.log(result.totalPost)
        var totalPost = result.totalPost;
        var keywords = req.body.keywords.replace(" ").split(',');
 
        db.collection('data').insertOne({_id : totalPost+1, title: req.body.title, keywords: keywords, writer: req.body.id, data: []}, ()=>{
            console.log('저장완료');
            db.collection('count').updateOne({name:'dataNum'},{ $inc: {totalPost:1}},(err, result)=>{
                if(err) return console.log(err);
                console.log('data 증가 성공');
                db.collection('user').updateOne({id: req.body.id},{ $push: {data: totalPost+1}});


                schedule.scheduleJob('* 8 * * *', ()=>{
                    console.log("매 8시마다 실행");

                    keywords.map((keyword)=>{
                        
                        const title = req.body.title

                        var date = new Date();
                        date = date.toLocaleDateString('ko-kr');
    
                        const schedule = parsing(keyword)
                        .then((titles)=>{
                            const rank = titles.indexOf(title)+1
                            return rank
                        }).then((rank)=>{
                            try{
                                db.collection('data').updateOne({title:title}, {$push: { data: {keyword: keyword, date: date, rank: rank}}})
                            } catch (err){
                                console.log(err);
                                schedule.cancel();
                            }   
                        })
                    })
                })

                res.redirect('/myPage/'+req.body.id); //res는 하나만 써야함.
            })
        })
    })
})


const getHTML = async(keyword) => {
    try {
        return await axios.get("https://search.naver.com/search.naver?query=" + encodeURI(keyword) + "&nso=&where=blog&sm=tab_opt")
    }catch(err) {
        console.log(err);
    }
}

const parsing = async (keyword) => {
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    const $list = $(".total_area")

    let titles = Array();

    $list.each((idx,node) => {
        const title = $(node).find('.total_tit').text();
        titles.push(title);
    })

    return titles
}

// 

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

app.get('')


app.post('/register',(req, res)=>{
    db.collection('user').insertOne({id: req.body.id, pw: req.body.pw, data: []},(err,result)=>{
        console.log('등록함')
        res.redirect("/login")
    })
})



const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { title } = require('process');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local',{
    failureRedirect: '/login'
}),(req, res)=>{
    res.redirect('/')
})

const isLogin = (req, res, next) => {
    if (req.user){
        next()
    } else {
        res.send(false)
    }
}

app.get('/user',isLogin,(req, res)=>{
    res.send(req.user)
})

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
  }, (id, pw, done) => {
    //console.log(입력한아이디, 입력한비번);
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


//   세션등록하기
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

  // /list db에서 가져오는 거e d