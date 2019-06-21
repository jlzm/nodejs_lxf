const http = require('http'),
    url = require('url'),
    util = require('util');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    // // res.end(util.inspect(url.parse(req.url, true)));
    const params = url.parse(req.url, true).query;

    res.write("网站：" + params.name);
    res.write("\n");
    res.write("url：" + params.url);
    res.end();
    res.end();
}).listen(3000);
