var mysql=require('mysql');
var express=require('express');

var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'blog',
    port:3000
});

connection.connect();
connection.query('SELECT 1+1 AS solution',function (error, results, fields) {
    if(error) throw error;
    console.log('连接成功',results[0].solution);
});
module.exports = connection;