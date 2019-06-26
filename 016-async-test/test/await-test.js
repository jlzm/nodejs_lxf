const fs = require('mz');
const assert = require('assert');
const hello = require('../hello');

it('test async function', async (done) => {
    // fs.readFile('filepath', (err, data) => {
    //     if(err) {

    //     } else {
    //         done();
    //     }
    // });
    // (async () => {
    //     try {
    //         let r = await hello();
    //         assert.stricEqual(r, 15);
    //         done()
    //     } catch (err) {
    //         done(err);
    //     }
    // })
    let r = await hello();
    assert.strictEqual(r, 15);
});