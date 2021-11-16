const http = require('http');
const path = require('path'); // 내장되어 있는 코어모듈
const express = require('express');

// 현재 위치에서 라우터에 있는 메인 js
const mainRouter = require('./routes/main');
const helloRouter = require('./routes/hello');

const port = 8080;

// Application Setup
const application = express()

    // 1. static resources
    .use(express.static(path.join(__dirname, '/public')))

    // 2. request body parser
    .use(express.urlencoded({extends: true}))   // application/x-www-form-urlencoded
    .use(express.json())                        // application/json

    // 3. view engine setup
    .use('views', path.join(__dirname, 'views'))
    .use('view engin', 'ejs')

    // 4. request router
    .all('*', function(req, res, next){
        req.locals.req = req;
        req.locals.res = res;
        next(); // 다음 라우터로 넘김
    })
    
    .use('/', mainRouter)
    .use('/hello', helloRouter)

// Server Setup
// 에러는 더 찾아서 직접 추가해볼 것.
http.createServer(application)
    .on('listening', function(){
        console.info(`http server runs on ${port}`);
    })
    .on('error', function(error){
        switch(error.code){
            case 'EACCESS':
                console.error(`${port} requires privileges`);
                // 프로세스 종료
                // exit(1) : 비정상 종료
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${port} is already in use`);
                process.exit(1);
                break;
            default:
                // 에러를 노드쪽으로 던져버림
                throw error;
        }
    })
    .listen(port);