/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var TodoStore = require('../stores/fluxibleTodoStore');

var TodoAction = {};

TodoAction.AddTodo = function (context, payload, done) {
    var todoStore = context.getStore(TodoStore);
    var newTodo = todoStore.createTodo({
        label: payload.label
    });
    context.service.create('todo', payload, {}, function (err, todo) {
        context.dispatch('ADD_TODO', todo);
        done();
    });
};

TodoAction.UpdateTodo = function (context, payload, done) {
    var todo = payload;
    context.service.update('todo', todo, {}, function (err, theTodo) {
        context.dispatch('UPDATE_TODO', theTodo);
        done();
    });
};

TodoAction.ToggleAllTodo = function (context, payload, done) {
    context.service.update('todo.toggleAll', payload, {}, function (err, res) {
        context.dispatch('TOGGLE_ALL_TODO', payload);
        done();
    });
};

TodoAction.ReceiveTodo = function (context, payload, done) {
    context.service.read('todo', {}, {}, function (err, todos) {
        context.dispatch('RECEIVE_TODO', todos);
        done();
    });
};

TodoAction.ToggleTodo = function (context, payload, done) {
    context.service.update('todo.toggle', payload, {}, function (err, theTodo) {
        context.dispatch('TOGGLE_TODO', theTodo);
        done();
    });
};
TodoAction.RemoveTodo = function (context, payload, done) {
    context.service.delete('todo', payload, {}, function (err, res) {
        context.dispatch('REMOVE_TODO', payload);
        done();
    });
};

TodoAction.ClearCompleted = function (context, payload, done) {
    context.service.delete('todo.clearCompleted', payload, {}, function (err, todos) {
        context.dispatch('CLEAR_COMPLETED', todos);
        done();
    });
};

TodoAction.EditTodo = function (context, payload, done) {
    context.dispatch('EDIT_TODO', payload);
    done();
};

module.exports = TodoAction;