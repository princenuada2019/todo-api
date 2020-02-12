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

    /*db.collection('Users').updateOne({name: 'emad'}, {
        $set: {
            name: 'ali'
        }
    }).then((result) => {
        console.log(result);
    });*/

    db.collection('Users').findOneAndUpdate({name: 'ali'}, {
        $set: {
            age: 24
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    //client.close();
});
