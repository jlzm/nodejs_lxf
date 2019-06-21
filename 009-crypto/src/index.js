const crypto = require('crypto');

// MD5和SHA1

// const hash = crypto.createHash('md5');

// hash.update('Hello node.js');

// console.log('hash', hash.digest('hex'));

// Hmac

// const hmac = crypto.createHmac('sha256', 'secret-key');

// hmac.update('Hello node.js');

// console.log('hmac', hmac.digest('hex'));

// AES

// 加密
// const aesEncrypt = (data, key) => {
//     const cipher = crypto.createCipher('aes192', key);

//     let cryped = cipher.update(data, 'utf8', 'hex');
//     cryped += cipher.final('hex');
//     return cryped;
// }

// // 解密
// const aesDecrypt = (encrypted, key) => {
//     const decipher = crypto.createDecipher('aes192', key);

//     let decryted = decipher.update(encrypted, 'hex', 'utf8');
//     decryted += decipher.final('utf8');
//     return decryted;
// }

// let data = 'Hello, this is a secret message!';

// let key = 'Password!';

// const encrypted = aesEncrypt(data, key);

// const decryted = aesDecrypt(encrypted, key);

// console.log('data', data);
// console.log('encrypted', encrypted);
// console.log('decryted', decryted);

// Diffie-Hellman

// 小明 keys
const ming = crypto.createDiffieHellman(512);
const ming_keys = ming.generateKeys();

const prime = ming.getPrime();
const generator = ming.getGenerator();

console.log('prime', prime.toString('hex'));
console.log('generator', generator.toString('hex'));

// 小红 keys
const hong = crypto.createDiffieHellman(prime, generator);
const hong_keys = hong.generateKeys();

const ming_secret = ming.computeSecret(hong_keys);
const hong_secret = hong.computeSecret(ming_keys);

console.log('ming_secret', ming_secret.toString('hex'));
console.log('hong_secret', hong_secret.toString('hex'));
