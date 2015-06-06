/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/addons').createStore;
var _ = require('underscore');

module.exports = createStore({
    storeName: 'TodoStore',
    handlers: {
        'RECEIVE_TODO': '_onReceiveTodo',
        'ADD_TODO': '_onAddTodo',
        'UPDATE_TODO': '_onUpdateTodo',
        'TOGGLE_TODO': '_onToggleTodo',
        'TOGGLE_ALL_TODO': '_onToggleAllTodo',
        'REMOVE_TODO': '_onRemoveTodo',
        'CLEAR_COMPLETED': '_onClearCompleted',
        'EDIT_TODO': '_onEditTodo'
    },
    initialize: function () {
        this.todos = [];
    },
    _onReceiveTodo: function (todos) {
        this.todos = todos;
        this.emitChange();
    },

    _onAddTodo: function (newTodo) {
        this.todos.push(newTodo);
        this.emitChange();
    },

    _onUpdateTodo: function (theTodo) {
        this.todos.forEach(function (todo, index) {
            if (todo._id === theTodo._id) {
                this.todos.splice(index, 1, theTodo);
            }
        }, this);
        this.emitChange();
    },
    _onToggleTodo: function (theTodo) {
        this.todos.forEach(function (todo, index) {
            if (todo._id === theTodo._id) {
                this.todos.splice(index, 1, theTodo);
            }
        }, this);
        this.emitChange();
    },
    _onToggleAllTodo: function (payload) {
        this.todos=_.map(this.todos, function (item) {
            item.isComplete = payload.isComplete;
            return item;
        });
        this.emitChange();
    },
    _onRemoveTodo: function (payload) {
        this.todos.forEach(function (todo, index) {
            if (todo._id === payload.id) {
                this.todos.splice(index, 1);
            }
        }, this);
        this.emitChange();
    },
    _onClearCompleted: function () {
        this.todos.forEach(function (todo, index) {
            if (todo.isComplete) {
                this.todos.splice(index, 1);
            }
        }, this);
        this.emitChange();
    },
    _onEditTodo: function (theTodo) {
        this.todos.forEach(function (todo, index) {
            if (todo._id === theTodo._id) {
                this.todos.splice(index, 1, theTodo);
            }
        }, this);
        this.emitChange();
    },

    getAll: function () {
        return this.todos;
    },
    createTodo: function (details) {
        return {
            label: String(details.label),
            isComplete: false
        };
    },
    dehydrate: function () {
        return {
            todos: this.todos
        };
    },
    rehydrate: function (state) {
        this.todos = state.todos;
    }
});
