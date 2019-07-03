const Koa = require('koa'),
    bodyParse = require('koa-bodyparser');
    controller = require('./controller'),
    template = require('./templating');

const app = new Koa();


app.use(async (ctx, next) => {
    let startTime = new Date().getTime(),
        ms = null;
    await next();
    ms = new Date().getTime() - startTime;
    ctx.response.set(`-Response-Time: ${ms}`);
});

app.use(bodyParse());

app.listen(3000);