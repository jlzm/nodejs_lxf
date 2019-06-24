const nunjucks = require('nunjucks');

const createEnv = (path, opts) => {
    const autoescape = opts.autoescape == undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefind || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(
                path, {
                    noCache,
                    watch
                }), {
                    autoescape,
                    throwOnUndefined
                }
        );
        if(opts.filters) {
            for (const f in opts.filter) {
                return env.addFilter(f, opts.filter[f]);
            }
        }
        return env;
}

// const env = createEnv('views', {
//     watch: true,
//     filters: {
//         hex: n => {
//             return 'OK' + n.toString(16);
//         }
//     }
// })

const template = (path, opts) => {
    let env = createEnv(path, opts);
    return async (ctx, next) => {
        // 绑定render函数
        ctx.render = (view, model) => {
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            ctx.response.type = 'text/html';
        }
        // 继续处理请求
        await next();
    }
}

module.exports = {
    // env,
    template
};