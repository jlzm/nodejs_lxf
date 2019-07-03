let porducts = [
    {
        name: 'xyy',
        price: 30000
    },
    {
        name: 'jlzm',
        price: 12222222222222
    }
]

module.exports = {
    'GET /api/products': async (ctx, next) => {
        ctx.response.type = 'application/json';

        ctx.response.body = {
            porducts
        }
    },
    'POST /api/products': async (ctx, next) => {
        console.log('ctx.request.body', ctx.request.body);
        let data = {
            name: ctx.request.body.name,
            price: ctx.request.body.price
        };

        porducts.push(data);
        ctx.response.type = 'application/json';
        ctx.response.body = data;
    }
}