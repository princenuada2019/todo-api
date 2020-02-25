const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '053122ali//';

bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(password, salt, (error, hash) => {
        console.log(hash);
    });
});

var hashedPassword = '$2a$10$ma3T.aK6QnysqbsGwMAewuuQYXWjDB2P2j.RXpF.5QzmCGY6RC4qq';

bcrypt.compare(password, hashedPassword, (error, res) => {
    console.log(res);
});

/*
let user = {
    id: 13
};

let token = jwt.sign(user, 'aliisagoodboylovecoding,butnotblive');
console.log('token', token);

let decoded = jwt.verify(token, 'aliisagoodboylovecoding,butnotblive');
console.log('decoded', decoded);
*/

/*

var message = 'I am ali ghassabbasi';
var hashedMessage = SHA256(message).toString();

console.log('original string', message);
console.log('hashed string', hashedMessage);
*/
