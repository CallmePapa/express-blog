//生成一个路由实例用来捕获访问主页的GET请求，
// 导出这个路由并在app.js中通过app.use("/",routers)加载．
//当访问主页时，就会调用res.render渲染views/index．ejs模块并显示到浏览器中
 var express = require('express');
 var router = express.Router();

 /* GET home page. */
 router.get('/', function(req, res, next) {
 res.render('index', { title: 'Express' });
 });

 module.exports = router;


