const crypto = require('crypto');
const config = require('./config');


const secretKey = process.env.JWT_SECRET;

function encrypt(text) {

    let encrypted = Buffer.from(text).toString('base64');
    return encrypted;
}

function decrypt(text) {
    const bufferCifrado = Buffer.from(text, 'base64');
    let decrypt = JSON.parse(bufferCifrado.toString('latin1'))
    return decrypt;
}
module.exports = {

    encrypt,
    decrypt
};
