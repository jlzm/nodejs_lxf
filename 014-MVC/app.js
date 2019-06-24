// 环境
isProduction = process.env.NODE_ENV === 'production';

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const Koa = require('koa');

const env = require('./nunjuck');



const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    let start = new Date().getTime(),
        execTime = null;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set(`X-Response-Time: ${execTime}ms`);
})

if(!isProduction) {
    const stateFiles = require('./staticFiles');
    const url = '/static/';
    app.use(stateFiles(url, __dirname + url));
}

// 解析post请求
app.use(bodyParser());

// 挂载渲染模板函数
app.use(env.template('views', {
    noCache: !isProduction,
    watch: !isProduction
}))

// 处理路由
app.use(controller());


app.listen(3000);