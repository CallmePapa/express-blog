var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require("mysql");


var routes = require('./routes/index');
var settings = require('./settings');
var flash = require('connect-flash');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();//生成一个express实例app.

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置views文件夹为存放视图文件的目录
app.set('view engine', 'ejs');//设置视图模板引擎为ejs.
app.use(flash());

app.set('port', process.env.P0RT || 3000);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//加载日志中间件
app.use(bodyParser.json());//加载解析json的中间件
app.use(bodyParser.urlencoded({extended: false}));//加载解析urlencoded请求体的中间件
app.use(cookieParser());//加载解析cookie的中间件
app.use(express.static(path.join(__dirname, 'public')));//设置public文件夹为存放静态文件的目录．

var session=require("express-session");
var MongoStore=require("connect-mongo")(session);

app.use(session({
    secret:settings.cookieSercret,
    key: settings.db,//cookie name
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new MongoStore({
        db: settings.db,
        host: settings.host,
        port: settings.port
    })
}));

app.use('/', index);
app.use('/users', users);//路由控制器．

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;//导出app实例供其他模块调用

routes(app);
app.listen(app.get('port'), function () {
    console.log("Express server listening on port" + app.get('port'));
});