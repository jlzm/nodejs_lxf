
const parserUser = (obj) => {
    if(!obj) {
        return;
    }
    console.log('obj', boj);
    let cookieValue = '';
    if(typeof obj === 'string') {
        cookieValue = obj;
    } else if(obj.headers) {
        let cookies = new Cookies(obj, null);
        cookieValue = cookies.get('name');
    }

    if(cookieValue) {
        try {
            let user = JSON.parse(Buffer.from(cookieValue, 'base64').toString());
            console.log('user', user);
            return user;
        } catch (error) {
            console.log('error', error);
        }
    }
}

module.exports = parserUser;