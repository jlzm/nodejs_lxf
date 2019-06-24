const env = require('../nunjuck');

const fn_index = (ctx, next) => {
    ctx.render('login.html');
}

const fn_signin = (ctx, next) => {
    const name = ctx.request.body.name,
        password = ctx.request.body.password;
    if (name === 'xyy' && password === '123456') {
        ctx.render('signInOk.html', {
            title: 'Signin In OK',
            name
        });
    } else {
        ctx.response.body = ctx.render('signInFailed.html', {
            title: 'Sign In Failed'
        });
    }
}

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
}