const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {Users} = require('./../server/models/users');

/*Todo.findOneAndRemove({text: 'ali gh'}).then((result) => {
    console.log(result);
});*/

Todo.findByIdAndRemove('5e4ba7a9afc85f6fbcbce311').then((result) => {
    console.log(result);
});
