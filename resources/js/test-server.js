// test-server.js
import http from 'http';
http.createServer((req, res) => {
    res.end('ok');
}).listen(8080, () => console.log('Listening on 8080'));
