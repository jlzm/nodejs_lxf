const fs = require('fs');
const router = require('koa-router')();

const addMapping = mapping => {
    for (const url in mapping) {
        if(url.startsWith('GET')) {
            const path = url.substring(4);
            router.get(path, mapping[url])
        } else if(url.startsWith('POST')) {
            const path = url.substring(5);
            router.post(path, mapping[url]);
        } else {
            console.log(`Invalid URL： ${url}!`);
        }
    }
}

const addControllers = dir => {
    const files = fs.readdirSync(__dirname + '/' + dir);
    const js_files = files.filter( file => {
        return file.endsWith('.js');
    })
    for (const file of js_files) {
        let mapping = require(__dirname + '/' + dir + '/' + file);
        addMapping(mapping);
    }
}

module.exports = (dir = 'controllers') => {
    addControllers(dir);
    return router.routes();
}