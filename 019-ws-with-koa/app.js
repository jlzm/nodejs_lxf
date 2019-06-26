const Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    controller = require('./controller'),
    template = require('./template'),
    WebSocket = require('ws'),
    parserUser = require('./uitl/parserUser')
    isProduction = process.env.NODE_ENV === 'production';



const app = new Koa();

const WebSocketServer = WebSocket.Server;

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    let startTime = new Date().getTime(),
        ms = null;
    ctx.state.user = parserUser(ctx.cookies.get('name') || '');
    await next();
    ms = new Date().getTime - startTime;
    ctx.response.set(`X-Response-Time: ${ms}`);
})

app.use(bodyParser());

app.use(template('views', {
    noCache: !isProduction,
    watch: !isProduction
}))

app.use(controller());


const server = app.listen(3000);

const wss = new WebSocketServer({
    server
});



