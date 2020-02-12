// MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

console.log(obj);
var obj = new ObjectID();

var user = {name: 'ali', age: 24};
var {name} = user;
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb server')
    }
    console.log('connected to mongodb server');
    const db = client.db('TodoApp');

    /*db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
        console.log(result);
    });*/

    /*db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
        console.log(result);
    });*/

    /*db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
        console.log(result);
    });*/

    db.collection('Users').deleteMany({name: 'ali'}).then((result) => {
        console.log(result);
    })

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5e439114b3cf351d4c2941fa')}).then((result) => {
        console.log(result);
    });

    //client.close();
});
