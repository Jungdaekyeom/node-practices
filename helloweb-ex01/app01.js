const http = require('http');

const port = 8080;
const server = http.createServer(function(req, resp){
    console.log('receive request.....');

    resp.writeHead(200, {
        'Content-Type': 'text/html',
    });
    
    resp.end('<h1>Hello World</h1>');
});

server.listen(8080, function(){
    console.log(`http server running on ${port}`);
});