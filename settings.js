/**
 * Created by weiqiujuan on 17-11-12.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user :'weiqiujuan',
    password:'123456',
    port :'3306',
    database:'blog'
});

connection.connect();

/*//查
 var sql =  'SELECT * FROM websites';

 //添
 var  addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
 var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];

 //删
 var delSql = 'DELETE FROM websites where id=6';*/

/*connection.query(sql,addSql,addSqlParams,delSql,function (error,results) {
 if(err){
 console.log('[SELECT  ERROR] - ',err.message);
 return;
 }
 console.log('-----------------------------select--------------------');
 console.log(result);
 console.log('INSERT ID:',result);
 console.log('DELETE affectedRows',result.affectedRows);
 console.log('--------------------------------------------------------\n\n')
 });

 connection.end();*/

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});