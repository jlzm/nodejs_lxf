const http = require('http');
const url = require('url');
const path = require('path');

http.createServer((request, response) => {
    console.log('request', request);
    console.log('response', response);
    response.writeHead(200, {'ContentType' : 'text/html'});
    response.end('<h1>Hello node.js</h1>')
}).listen(3000);

console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

const workDir = path.resolve('.');

const filePath = path.join(workDir, 'pub', 'index.html');

