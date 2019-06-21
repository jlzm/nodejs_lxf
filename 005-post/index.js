const http = require('http'),
    querystring = require('requerystring'),
    util = require('util');

http.createServer((req, res) => {
    // 定义post变量
    let post = '';

    // 监听data事件， 将获参累加到post变量
    req.on('data', (chunk) => {
        post += chunk;
    });

    req.on('end', () => {
        post = querystring.parse(post);
        res.end(util.inspect(post))
    })
}).listen(3000);