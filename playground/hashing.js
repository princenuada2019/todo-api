const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let user = {
    id: 13
};

let token = jwt.sign(user, 'aliisagoodboylovecoding,butnotblive');
console.log('token', token);

let decoded = jwt.verify(token, 'aliisagoodboylovecoding,butnotblive');
console.log('decoded', decoded);

/*

var message = 'I am ali ghassabbasi';
var hashedMessage = SHA256(message).toString();

console.log('original string', message);
console.log('hashed string', hashedMessage);
*/
