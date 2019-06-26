const fn_hello = async (ctx, next) => {

    ctx.render('hello.html');
    // ctx.response.body = `<h1>hello</h1>`;
}

module.exports = {
    'GET /': fn_hello
}