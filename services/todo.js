
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/todo');
var Todo = require('../models/todo.js');

var randomResponseTime = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
    name: 'todo',
    read: function (req, resource, params, config, callback) {
        Todo.find(function (err, todos) {
            if (todos.length == 0) {
                Todo.create({
                    label: 'Rule the web',
                    isComplete: false
                }, function (err, post) {
                    todos.push(post)
                    callback(null,todos);
                })
            } else {
                callback(null,todos);
            }
        });
    },
    create: function (req, resource, params, body, config, callback) {
        var newTodo = {
            label: params.label
        };
        Todo.create(newTodo, function (err, post) {
            callback(null, post);
        })
    },
    update: function (req, resource, params, body, config, callback) {
        if (resource === 'todo.toggleAll') {
            Todo.update({}, {isComplete: params.isComplete}, {multi: true}, function (err, count) {
                callback(null, {success: true});
            })
        }
        else if (resource === 'todo.toggle') {
            Todo.findByIdAndUpdate(params.id, {isComplete: params.isComplete}, {new: true}, function (err, post) {
                callback(null, post);
            })
        }
        else {
            Todo.findByIdAndUpdate(params.id, {label:params.label}, {new: true}, function (err, post) {
                callback(null, post);
            });
        }
    },
    delete: function(req, resource, params, config, callback) {
        if (resource === 'todo.clearCompleted') {
            Todo.remove({isComplete: true}, function (err, count) {
                callback(null, {success: true});
            })
        }else{
            Todo.findByIdAndRemove(params.id, {}, function (err, post) {
                callback(null, {success: true});
            });
        }
    }
};
