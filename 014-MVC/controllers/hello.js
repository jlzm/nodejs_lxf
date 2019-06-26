
const fn_hello = async(ctx, netx) =>{
    ctx.render('hello.html');
}

module.exports =  {
    'GET /hello/:name': fn_hello
}