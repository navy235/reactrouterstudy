var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/todo');
var Todo = require('../models/todo.js');
/* GET home page. */
router.get('/', function (req, res, next) {
    var api = {
        api: "success"
    };
    res.send(api);
});

/* GET home page. */
router.get('/todo', function (req, res, next) {
    Todo.find(function (err, todos) {
        if (err) return next(err);
        if (todos.length == 0) {
            Todo.create({
                label: 'Rule the web',
                isComplete: false
            }, function (err, post) {
                todos.push(post)
                res.send(todos);
            })
        } else {
            res.send(todos);
        }
    });
});

router.post('/todo', function (req, res, next) {
    Todo.create(req.body, function (err, post) {
        if (err) return next(err);
        res.send(post);
    })
});

router.post('/todo/clearcompleted', function (req, res, next) {
    Todo.remove({isComplete: true}, function (err, count) {
        if (err) return next(err);
        res.send({success: true});
    })
})


router.post('/todo/toggleall', function (req, res, next) {
    Todo.update({}, {isComplete: req.body.isComplete}, {multi: true}, function (err, count) {
        if (err) return next(err);
        res.send({success: true});
    })
})

/* GET /todos/id */
router.get('/todo/:id', function (req, res, next) {
    Todo.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.send(post);
    });
});

/* PUT /todos/:id */
router.put('/todo/:id', function (req, res, next) {
    Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.send(post);
    });
});

/* DELETE /todos/:id */
router.delete('/todo/:id', function (req, res, next) {
    Todo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.send({success: true});
    });
});


module.exports = router;
