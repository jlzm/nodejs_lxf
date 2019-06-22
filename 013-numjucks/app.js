const nunjucks = require('nunjucks');

const createEnv = (path, opts) => {
    let autoescape = opts.autoescape == undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache,
                watch
            }), {
                autoescape,
                throwOnUndefined
            }
        );
    if (opts.filters) {
        for (const f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

const env = createEnv('views', {
    watch: true,
    filters: {
        hex: (n) => {
            return 'OK' + n.toString(16);
        }
    }
})

const content = env.render('hello.html', {name: '飞毛腿'});
console.log('content', content);