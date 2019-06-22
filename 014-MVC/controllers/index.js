const env = require('../nunjuck');

const fn_index = (ctx, next) => {
    ctx.response.body = env.env.render('signin.html');
}

const fn_signin = (ctx, next) => {
    console.log('啊啊啊');
    const name = ctx.request.body.name,
        password = ctx.request.body.password;
    if(name === 'xyy' && password === '123456') {
        // ctx.response.body = `<h1>Welcome, ${name}</h1>`;
        // ctx.redirect('/hello')
        alert('111')
    } else {
        ctx.response.body = `<h1>Login failed</h1>
        <p><a href="/">Try again</a></p>
        `;
    }
}

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
}