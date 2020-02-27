require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/users');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((savedTodo) => {
        res.send(savedTodo);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({_creator: req.user._id}).then((todos) => {
        res.send({todos});
    }).catch((error) => {
        res.status(400).send(error);
    })
});

app.get('/todos/:id', authenticate, (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send('User id is invalid');
    }
    Todo.findOne({
        _id: req.params.id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send('there is no todo with this id');
        }
        res.send({todo});
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.delete('/todos/:id', authenticate, (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send('User id is invalid');
    }

    Todo.findOneAndRemove({
        _id: req.params.id,
        _creator: req.user._id
    }).then((result) => {
        if (!result) {
            return res.status(404).send('there is no todo with this id');
        }

        res.send({result});
    }).catch((error) => {
        res.status(400).send(error);
    })
});

app.patch('/todos/:id', authenticate, (req, res) => {
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

    Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
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

app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    Users.findByCredentials(email, password).then ((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((error) => {
        res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch(() => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started up at port 3000`);
});

module.exports = {app};
