
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var libsaes =  require('./libs-aes')

// 创建 application/x-www-form-urlencoded 编码解析
// var urlencodedParser = bodyParser.urlencoded({ extended: false })


// 创建 application/json 编码解析
var jsonParser = bodyParser.json()

// 解析 url-encoded格式的表单数据
// app.use(bodyParser.urlencoded({ extended: false }));

// 解析json格式的表单数据
// app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.redirect('/index.htm');
})

app.get('/index.htm', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
 })

 app.get('/index.html', function (req, res) {
    res.redirect('/index.htm');
 })

 app.get('/test.htm', function (req, res) {
    
    res.sendFile( __dirname + "/" + "a.htm" );
 })

 app.post('/api/dowork', jsonParser, function (req, res) {
 
    
    aes_key = req.body['aes-key'];
    aes_password = req.body['aes-password'];

    file = '/path/to/your/dir/app.yml';
    libsaes.decrypt_file_main(file,aes_key,aes_password)

    res.status(200).end()
    // res.end(JSON.stringify(response));
 })

app.use('/public/js/', express.static('./js/'));
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})


