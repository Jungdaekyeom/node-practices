
const http = require('http');
const fs = require('fs');

const port = 8080;
const server = http.createServer(function(req, resp){
    console.log(req.url);

    // 경로 지정
    if(req.url == '/'){
        req.url = '/index.html';
    }

    // 파일 읽기
    // __dirname : C:\douzone2021\eclipse-workspace\node-practices\helloweb-ex01 의 풀 디렉토리
    // fs.readFile(__dirname + '/public' + req.url)와 같음
    fs.readFile(`${__dirname}/public${req.url}`, function(error, data){
        resp.writeHead(200, {
            'Content-Type': 'text/html',
        });
        resp.end(data);
    });
});

server.listen(8080, function () {
    console.log(`http server running on ${port}`);
});