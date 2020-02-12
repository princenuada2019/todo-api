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

    /*db.collection('Todos').find({
        _id: new ObjectID('5e43079f9da1e936d4433e89')
    }).toArray().then((docs) => {
        console.log('Todos:');
        console.log(JSON.stringify(docs, undefined, 4));
    }).catch((err) => {
        console.log('Unable to fetch Todos.', err);
    });*/

    db.collection('Todos').find().count().then((count) => {
        console.log('Todos count:', count);
    }).catch((err) => {
        console.log('Unable to fetch Todos.', err);
    });

    db.collection('Users').find({name: 'ali'}).toArray().then((users) => {
        console.log('users:');
        console.log(JSON.stringify(users, undefined, 4));
    }).catch((err) => {
        console.log('Unable to find queried users.', err);
    });

    client.close();
});
