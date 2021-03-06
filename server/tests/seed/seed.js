const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {Users} = require('./../../models/users');

var userOneId = new ObjectID();
var userTwoId = new ObjectID();

const users = [
    {
        _id: userOneId,
        email: 'example1@ex.com',
        password: 'abc123ali',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userOneId.toHexString(), access: 'auth'}, process.env.JWT_SECRET).toString()
        }]
    },
    {
        _id: userTwoId,
        email: 'example2@ex.com',
        password: 'abc123ali',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userTwoId.toHexString(), access: 'auth'}, process.env.JWT_SECRET).toString()
        }]
    }
];

const todos = [
    {
        _id: new ObjectID(),
        text: 'first todo test',
        _creator: userOneId
    },
    {
        _id: new ObjectID(),
        text: 'second todo test',
        completed: true,
        completedAt: 333,
        _creator: userTwoId
    }
];

var populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

var populateUsers = (done) => {
    Users.remove({}).then(() => {
        var userOne = new Users(users[0]).save();
        var userTwo = new Users(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};
