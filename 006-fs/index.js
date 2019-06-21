const fs = require('fs');

异步读取文件
fs.readFile('sample.txt', (err, data) => {
    if(err) {
        console.log('err', err);
    } else {
        console.log('data', data);
        const text = data.toString('utf-8');
        console.log('text', text);
        const buf = Buffer.from(text, 'utf-8');
        console.log('buf', buf);
    }
})

// 异步写入文件
const data = 'Hello Node.js'
fs.writeFile('sample.txt', data, (err, data) => {
    if (err) {
        console.log('err', err);
    } else {
        console.log('ok');
    }
})
