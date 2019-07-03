
const APIError = (code = 'internal:unknown_error', message) => {
    this.code = code;
    this.message = message;
}

module.exports = {
    APIError,
    restify: (pathPrefix = '') => {
        return async (ctx, next) => {
            if (ctx.response.path.startsWith(pathPrefix)) {
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }
                try {
                    await next();
                } catch (error) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: error.code || 'internal:unknown_error',
                        message: error.message || ''
                    }
                }
            } else {
                await next();
            }
        }
    }
}