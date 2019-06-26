const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime - start;
    console.log('ms', ms);
    ctx.response.set('X-Response-Time', `${ms}ms`);
})

app.use(async (ctx, nex) => {
    let name = ctx.request.query.name || 'word';
    ctx.response.type = 'text/html';
    ctx.response.body = `<h1>Hello, ${name}!</h1>`
})

module.exports = app;