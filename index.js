import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    let filePath;

    if(req.url === '/' || req.url === '/index') {
        filePath = 'index.html';
    } else if (req.url === '/about') {
        filePath = 'about.html';
    } else if (req.url === '/contact-me') {
        filePath = 'contact-me.html';
    } else {
        filePath = '404.html';
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { "content-type": 'text/plain '});
            res.end('Server error');
            return;
        }

        const statusCode = filePath ==='404.html' ? 404 : 200;
        res.writeHead(statusCode, { 'content-type': 'text/html'});
        res.end(data);
    });
});




server.listen(8080, () => {
    console.log('Server running on port 8080');
});