const assert = require('assert');

const sum = require('../hello');

describe('#hello.js', () => {
    describe('#sum()', () => {
        it('sum() should return 0', () => {
            assert.strictEqual(sum(1, 3), 1);
        });
        it('sum() should return 1', () => {
            assert.strictEqual(sum(), 1);
        });
        it('sum() should return 2', () => {
            assert.strictEqual(sum(), 3);
        });
    })
})
module.exports = () => {
}