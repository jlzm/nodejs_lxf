const fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 从命令行参数获取root目录， 默认是当前目录
const root = path.resolve(process.argv[2] || '.');

// 默认目录文件

const defultDirFile = ['index.html', 'default.html'];

const server = http.createServer( (request, response) => {
    // 获取url的path, 类似 '/css/bootstrap.css'
    let pathname = url.parse(request.url).pathname;
    
    // 获得对于的本地文件路径，类似 '/srv/www/css/bootstrap.css'
    const getFilepath = () => {
        let rootFilepath =  path.join(root, pathname);
        console.log('rootFilepath', rootFilepath);
        if(pathname !== '/') {
            return rootFilepath;
        }
        for(let file of defultDirFile) {
            try {
                if(fs.readFileSync(rootFilepath + file)) {
                    return rootFilepath + file;
                }
            } catch{
                continue;
            }
        }
    };
    let filepath = getFilepath();
    // 获取文件状态
    fs.stat(filepath, (err, stats) => {
        if(!err && stats.isFile()) {
            // 没有出错并且文件在
            console.log('200', request.url);

            // 发送200响应
            response.writeHead(200);

            // 将文件流导向response
            fs.createReadStream(filepath).pipe(response);
        } 
        else {
            // 出错或者文件不存在
            console.log('404', request.url);

            response.writeHead(404);
            response.end('404 Not Found');
        }
    })
}).listen(3000)

