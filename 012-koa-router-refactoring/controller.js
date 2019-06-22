const fs = require('fs');

// 解析路径
const addMapping = (router, mapping) => {
    for (const url in mapping) {
        if (url.startsWith('GET')) {
            // url类似GET
            const path = url.substring(4);
            router.get(path, mapping[url]);
        } else if (url.startsWith('POST')) {
            // url类似POST
            const path = url.substring(5);
            router.post(path, mapping[url]);
        } else {
            console.log(`Invalid URL: ${url}!`);
        }
    }
}

// 路由控制
const addControllers = (router, dir) => {
    const files = fs.readdirSync(__dirname + dir);
    const js_files = files.filter(file => {
        return file.endsWith('.js');
    })
    for (const file of js_files) {
        console.log('file', file);
        let mapping = require(__dirname + dir + '/' + file);
        addMapping(router, mapping);
    }
}


module.exports = dir => {
    let controllers_dir = dir || '/controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}