const nunjucks = require('nunjucks');

const createEnv = (path, opts) => {
    let noCache = opts.noCache || false,
        watch = opts.watch,
        autoescape = opts.autoescape || true,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache,
                watch,
            }), {
                autoescape,
                throwOnUndefined
            })

    if (opts.filters) {
        for (const filter in opts.filters) {
            env.addFilter(filter, opts.filter[filter])
        }
    }
    return env;
}

const template = (path, opts) => {
    const env = createEnv(path, opts);
    return async (ctx, next) => {
        ctx.render = (view, model) => {
            ctx.response.body = env.render(view, Object.assign({}, ctx.start || {}, model || {}));
            ctx.response.type = 'text/html';
        }
        await next();
    }
}


module.exports = template;