var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require("method-override");



var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
const admin_addRouter = require('./routes/admin_add');
const adminRouter = require('./routes/admin');
const editRouter = require('./routes/edit');
const editingRouter = require('./routes/editing');



var app = express();

// 🟢 الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ Connection error:', err));


//   Layout
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));



app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/admin/add', admin_addRouter);
app.use('/admin/add', adminRouter);
app.use('/admin', adminRouter);
app.use('/admin/edit', editingRouter);
app.use('/admin/edit', editRouter);



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
