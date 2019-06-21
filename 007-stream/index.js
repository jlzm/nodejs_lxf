const fs = require('fs');

// 流

const rs = fs.createReadStream('sample.txt', 'utf-8');

// rs.on('data', chunk => console.log('data', chunk));

// rs.on('end', () => console.log('end'));

// rs.on('error', err => console.log('err', err));

// const wsU = fs.createWriteStream('outputU.txt', 'utf-8');
// const wsB = fs.createWriteStream('outputB.txt', 'utf-8');

// wsU.write('使用Stream写入文本数据...\n');
// wsU.write('end-wsU.');
// wsU.end();

// wsB.write('使用Stream写入二进制数据...\n');
// wsB.write('end-wsB.');
// wsB.end();


const ws = fs.createWriteStream('copied.txt');

rs.pipe(ws);