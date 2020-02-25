var {Users} = require('./../models/users');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    Users.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject(); // this will stop findByToken function executing and jump to catch block down below
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((error) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};
