const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`Метод: ${req.method}, URL: ${req.url}`);

    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET') {
        if (parsedUrl.pathname === '/') {
            const filePath = path.join(__dirname, 'index.html');
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else if (parsedUrl.pathname === '/json') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Hello, JSON!' }));
        } else if (parsedUrl.pathname === '/about') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('About page');
        } else if (parsedUrl.pathname === '/contact') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Contacts');
        } else if (Object.keys(parsedUrl.query).length > 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ params: parsedUrl.query }));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Page is not found');
        }
    } else if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Data obtained: ${body}`);
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
