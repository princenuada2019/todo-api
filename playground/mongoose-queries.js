const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Users} = require('./../server/models/users');

/*var id = '5e4435efab9a1cc480a5b3b022';

if (!ObjectID.isValid(id)) {
    console.log('invalid Id');
}*/

/*Todo.find({
    _id: id
}).then((todos) => {
    console.log('todos:', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('todo', todo)
});*/

/*Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found')
    }
    console.log('todo by id', todo);
}).catch((error) => console.log(error));*/

Users.findById('5e440b3bfa812373b4389760').then((user) => {
    if (!user) {
        return console.log('user with this id not found');
    }

    console.log('user by id:' , user);
}).catch((error) => console.log(error));
