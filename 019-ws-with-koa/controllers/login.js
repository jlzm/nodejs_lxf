// 登入表单
const fn_login = async (ctx, next) => {
    ctx.render('login.html');
    // ctx.response.body = `<h1>login</h1>`;
}


// 响应登入表单
const fn_signin = async (ctx, next) => {
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    if(name == 'xyy' && password == 'jlzm') {
        ctx.render('signInOk.html', name);
        // ctx.response.body = `<h1>signInOk</h1>`;
    } else {
        ctx.render('signInFailed.html');
        // ctx.response.body = `<h1>signInFailed</h1>`;
    }
}

module.exports = {
    'GET /login': fn_login,
    'POST /signin': fn_signin
}