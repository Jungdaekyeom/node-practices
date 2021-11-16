// npm i connect
// npm i serve-static

const connect = require('connect');
const serveStatic = require('serve-static');
const connectRoute = require('connect-route');

const port = 8080;
const app = connect(); // 커넥트 실행

app.use(connectRoute(function(router){
    router.get("/", function(req, resp){
        // 여기서 DB에 가도 되고~ 뭐 해도 되고~ 그럼
        resp.writeHead(200, {
            'Content-Type': 'text/html',
        });
        resp.end('<h1>Main</h1>');
    });

    router.get("/user", function(req, resp){
        console.log(req._parsedUrl.query);

        req.query = {};
        params = (req._parsedUrl.query || '').split('&');
        params.forEach(function(param){
            tokens = param.split('=');
            req.query[tokens[0]] = tokens[1];
        });

        // url로 넘어오는 파라미터에 대한 처리가 어렵다
        console.log(req._parsedUrl.query);
        resp.writeHead(200, {
            'Content-Type': 'text/html'
        });
        resp.end(`<h1>User No: ${req.query.no}</h1>`);        
    });

    router.get("/guestbook", function(req, resp){
        resp.writeHead(200, {
            'Content-Type': 'text/html'
        });
        resp.end('<h1>Guestbook List</h1>');
    });
    
    router.get("/board", function(req, resp){
        resp.writeHead(200, {
            'Content-Type': 'text/html'
        });
        resp.end('<h1>Board List</h1>');
    });    

    router.get("/board/:no", function(req, resp){
        resp.writeHead(200, {
            'Content-Type': 'text/html'
        });
        resp.end(`<h1>Board View: ${req.params.no}</h1>`);
    });    

}));
app.use(serveStatic(__dirname + "/public"));


app.listen(port, function(){
    console.log(`http server running on ${port}`);
});