var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const {MongoClient} = require('mongodb');
const bodyparser =require('body-parser')
var mongoose =require('mongoose')
var logger = require('morgan');

const uri = "mongodb+srv://manhtien465:tien1234@cluster0-vaatg.mongodb.net/xoay?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
const connection=mongoose.connection;
connection.once('open',()=>{
  console.log("thanhf cong");
  
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// const storage=multer.diskStorage({
//   destination:'./pulic/images',
//   filename: function(req,file,cb){
//     cb(null,file.fieldname+'-' +Date.now()+path.extname(file.originalname))    /upload ảnh thát bại
//   }
// })
// const upload=multer({
//   storage:storage,
//   limits:{fileSize:1000000}
// }).single('image')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyparser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,__dirname,"images")));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
