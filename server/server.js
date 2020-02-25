require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/users');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

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

        res.send({result});
    }).catch((error) => {
        res.status(400).send(error);
    })
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('User id is invalid');
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send('todo not found');
        }
        res.send({todo});
    }).catch((error) => res.status(400).send(error));
});

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new Users(body);
    /*if (!(validator.isEmail(body.email))) {
        return res.send('please insert a valid email');
    }*/

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((error) => {
        res.status(400).send(`ali gh ${error}`);
    })
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


app.listen(port, () => {
    console.log(`Started up at port 3000`);
});

module.exports = {app};
