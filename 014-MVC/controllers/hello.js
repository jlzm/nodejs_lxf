const env = require('../nunjuck');

const fn_hello = async(ctx, netx) =>{
    const name = ctx.params.name;
    ctx.response.body = env.env.render('hello.html', {name});
}

module.exports =  {
    'GET /hello/:name': fn_hello
}