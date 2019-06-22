const fs = require('fs');
const router = require('koa-router')();

const addMaping = maping => {
    for (const url in maping) {
        if(url.startsWith('GET')) {
            const path = url.substring(4);
            router.get(path, maping[url])
        } else if(url.startsWith('POST')) {
            const path = url.substring(5);
            router.post(path, maping[url]);
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
        let maping = require(__dirname + '/' + dir + '/' + file);
        addMaping(maping);
    }
}

module.exports = (dir = 'controllers') => {
    addControllers(dir);
    return router.routes();
}