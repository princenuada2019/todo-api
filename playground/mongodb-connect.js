// MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

var user = {name: 'ali', age: 24};
var {name} = user;
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb server')
    }
    console.log('connected to mongodb server');
    const db = client.db('TodoApp');

    /*db.collection('Todos').insertOne({
        text: 'Something to add',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert new todo', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });*/

    /*db.collection('Users').insertOne({
        name: 'ali',
        age: 24,
        location: 'mashhad'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert new user', err);
        }

        console.log(result.ops[0]._id.getTimestamp());
    });*/

    client.close();
});
