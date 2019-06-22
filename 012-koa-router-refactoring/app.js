
const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

// 路由控制
const controller = require('./controller');

const app = new Koa();


app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(bodyParser())

app.use(controller());


app.listen(3000);
console.log('app started ao port 3000...');