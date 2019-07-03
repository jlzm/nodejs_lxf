const Koa = require('koa'),
    router = require('koa-router'),
    bodyParser = require('koa-bodyparser'),
    controller = require('./controller'),
    cors = require('koa2-cors');

const app = new Koa();
app.use(cors());
// app.use(async (ctx, next)=> {
//     let startTime = new Date().getTime(),
//         ms = null;
//     await next();
//     ms = new Date().getTime() - startTime;
//     console.log('ms');
// })

app.use(bodyParser());

app.use(controller());

app.listen(3000);

console.log('app started at port: 3000...');