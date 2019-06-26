const WebScoket = require('ws');


// 服务端
const WebScoketServer = WebScoket.Server;

const wss = new WebScoketServer({
    port: 3000
});


wss.on('connection', (ws) => {
    console.log('[SERVER] connection()');
    ws.on('message', (message) => {
        console.log(`[SERVER] Received ${message}`);
        setTimeout(() => {
            ws.send(`ECHO: ${message}`, err => {
                if(err) {
                    console.log(`[SERVER] error: ${err}`);
                }
            })
        }, 1000);
    })
})













// 客户端
const ws = new WebScoket('ws://localhost:3000/test');

ws.on('open', () => {
    console.log('[CLIENT] open()');
    ws.send('Hello, Nodejs!');
})

let count = 0;

ws.on('message', (message) => {
    console.log(`[CLIENT] Received: ${message}`);
    count ++;
    if(count < 3) {
        setTimeout(() => {
            ws.send(`Hello, I'm Mr NO.${count}`);
        }, 1000);
    } else {
        ws.send('Goodby!');
        ws.close();
    }
    
})