var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/users');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });

    todo.save().then((savedTodo) => {
        res.send(savedTodo);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }).catch((error) => {
        res.status(400).send(error);
    })
});

app.get('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send('User id is invalid');
    }
    Todo.findById(req.params.id).then((todo) => {
        if (!todo) {
            return res.status(404).send('there is no todo with this id');
        }
        res.send({todo});
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.delete('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send('User id is invalid');
    }

    Todo.findByIdAndRemove(req.params.id).then((result) => {
        if (!result) {
            return res.status(404).send('there is no todo with this id');
        }

        res.send(result);
    }).catch((error) => {
        res.status(400).send(error);
    })
});

app.listen(3000, () => {
    console.log(`Started up at port 3000`);
});

module.exports = {app};
