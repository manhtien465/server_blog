var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const {MongoClient} = require('mongodb');
const bodyparser =require('body-parser')
var mongoose =require('mongoose')
var logger = require('morgan');
const session =require("express-session")

const config=require('config')
const uri=config.get('mongoURL');
const graphqlHTTP= require('express-graphql')
const schema=require("./scheme/schema")
const key=require('./config/key')
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
const connection=mongoose.connection;
connection.once('open',()=>{
  console.log("thanhf cong");
  
})
var autheRouter =require('./routes/authe')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
// const RedisStore=connectRedis(session)
// const store= new RedisStore({
//   host:key.session.host,
//   port:key.session.port,
//   pass:key.session.pass
// })
// app.use({
//   store,
//   name:key.session.name,
//   secret:key.session.secret,
//   resave:false,
//   saveUninitialized:false,
//   cookie:{
//     maxAge:key.session.lifetime,
//     sameSite:true,
    
//   }
// })
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyparser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/authe',autheRouter);
app.use("/graphql",graphqlHTTP({
   schema,
   graphiql:true
   
}))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
