const crypto = require('crypto');

const hash = crypto.createHash('sha256').update('Hello, Node.js').digest('hex');
console.log('Хеш:', hash);
