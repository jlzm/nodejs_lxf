const Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    controller = require('./controller'),
    template = require('./template'),
    WebSocket = require('ws'),
    parserUser = require('./uitl/parserUser')
    isProduction = process.env.NODE_ENV === 'production';



const app = new Koa();

const WebSocketServer = WebSocket.Server;

// start 开始
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    let startTime = new Date().getTime(),
        ms = null;
    ctx.state.user = parserUser(ctx.cookies.get('name') || '');
    await next();
    ms = new Date().getTime - startTime;
    ctx.response.set(`X-Response-Time: ${ms}`);
})

// Mold 数据层
app.use(bodyParser());

// View 渲染层
app.use(template('views', {
    noCache: !isProduction,
    watch: !isProduction
}))

// Controller 控制层
app.use(controller());


const server = app.listen(3000);

// WebSocket接口
const wss = new WebSocketServer({
    server
});

// webServer
wss.on('connection', (ws, req) => {
    let user = parserUser(req);
    if(!user) {
        ws.close(4001, 'Invalid user');
        return;
    }
    ws.user = user;
    ws.wss = wss;
})

wss.broadcast = (data) => {
    wss.clients.forEach(client => {
        client.send(data);
    })
}



// Client

const ws = new WebSocket('ws:localhost:3000/ws/chat');

ws.on('open', function() {
    console.log('[CLIENT] : open()');
    ws.send('Hello!');
})

ws.on('message', function(message) {
    console.log(`[CLIENT] Received: ${message}`);
    if(message && message.trim()) {
        let msg = createMessage('chat', ws.user, message.trim());
        ws.wss.broadcast(msg);
    }
})