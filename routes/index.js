//生成一个路由实例用来捕获访问主页的GET请求，
// 导出这个路由并在app.js中通过app.use("/",routers)加载．
//当访问主页时，就会调用res.render渲染views/index．ejs模块并显示到浏览器中
//第一次提交
/* var express = require('express');
 var router = express.Router();

 /!* GET home page. *!/
 router.get('/', function(req, res, next) {
 res.render('index', { title: 'Express' });
 });

 module.exports = router;*/

//第二次提交
/*module.exports=function (app) {
 app.get('/',function (req,res) {
 res.render('index',{title:"Express"});
 });
 app.get('/nswbmw',function (req,res) {
 res.send('hello world');
 });
 };*/

//搭建博客
var crypto = require('crypto'),
    User = require("../models/user");
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {title: '主页'});
    });
    app.get('/reg', function (req, res) {
        res.render('reg', {title: '注册'});
    });
    app.post('/reg', function (req, res) {
        var name = req.body.name,
            password = req.body.password,
            password_re = req.body['password-repeat'];
        if (password_re !== password) {
            req.flash("error", "两次输入的密码不一致");
            return res.redirect('/reg');//返回注册页
        }
        //生成密码的md5值
        var md5 = crypto.createHash('md5');
        password = md5.update(req.body.password).digest("hex");
        var newUser = new UserDataHandler({
            name: name,
            password: password,
            email: req.body.email
        });

        //检查用户是否存在
        User.get(newUser.name, function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            if (user) {
                req.flash("error", "用户已存在");
                return res.redirect("/reg");//返回注册页
            }
            //用户不存在则新增用户
            newUser.save(function (err, user) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/reg');//注册失败返回注册页
                }
                req.session.user = newUser;//用户信息存入session
                req.flash('success', "注册成功");
                res.redirect("/");//注册成功后返回主页
            });
        });
    });
    app.get('/login', function (req, res) {
        res.render('login', {
            title: '登录',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash("error").toString()
        });
    });
    app.post('/login', function (req, res) {
    });
    app.get('/post', function (req, res) {
        res.render('login', {title: '发表'});
    });
    app.post('/post', function (req, res) {
    });
    app.get('/logout', function (req, res) {
        res.session.user = null;
        req.flash("success", "登出成功");
        res.redirect('/');//登出成功后跳转到主页
    });
};


