const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Hello world');
        res.end;
    }
    if(req.url === '/api/courses'){
        req.write(JSON.stringify([1, 2, 3]));
        res.end;
    }
});

server.listen(8899);

console.log('Server listening on port 8899....')