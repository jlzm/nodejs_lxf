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

const env = createEnv('views', {
    watch: true,
    filters: {
        hex: n => {
            return 'OK' + n.toString(16);
        }
    }
})

module.exports = {
    env
}