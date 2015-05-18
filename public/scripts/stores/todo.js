/**
 * Created by hshen on 5/15/2015.
 */
var Reflux = require('reflux');
var TodoActions = require('../actions/todo');
var _ = require("underscore");
var request = require('superagent')

function getItemByKey(list, itemKey) {
    return _.find(list, function (item) {
        return item._id === itemKey;
    });
}
var TodoStore = Reflux.createStore({
    // this will set up listeners to all publishers in TodoActions, using onKeyname (or keyname) as callbacks
    listenables: [TodoActions],
    onEditItem: function (itemKey, newLabel) {
        var self = this;
        var foundItem = getItemByKey(this.list, itemKey);
        if (!foundItem) {
            return;
        }
        var index = _.indexOf(this.list, foundItem);
        request.put('http://localhost:3000/api/todo/' + foundItem._id)
            .send({label: newLabel})
            .end(function (err, res) {
                self.list[index] = res.body;
                self.updateList(self.list);
            });
    },
    onAddItem: function (label) {
        var self = this;
        request.post('http://localhost:3000/api/todo')
            .send({isComplete: false, label: label})
            .end(function (err, res) {
                self.list.push(res.body);
                self.updateList(self.list);
            });
    },
    onRemoveItem: function (itemKey) {
        var self = this;
        var foundItem = getItemByKey(this.list, itemKey);
        if (foundItem) {
            var index = _.indexOf(this.list, foundItem);
            request.del('http://localhost:3000/api/todo/' + foundItem._id)
                .end(function (err, res) {
                    if (res.body.success) {
                        self.list.splice(index, 1);
                        self.updateList(self.list);
                    }
                });
        }

    },
    onToggleItem: function (itemKey) {
        var self = this;
        var foundItem = getItemByKey(this.list, itemKey);
        if (foundItem) {
            var index = _.indexOf(this.list, foundItem);
            request.put('http://localhost:3000/api/todo/' + foundItem._id)
                .send({isComplete: !foundItem.isComplete})
                .end(function (err, res) {
                    self.list[index] = res.body;
                    self.updateList(self.list);
                });

        }
    },
    onToggleAllItems: function (checked) {
        var self = this;
        request.post('http://localhost:3000/api/todo/toggleall')
            .send({isComplete: true})
            .end(function (err, res) {
                if (res.body.success) {
                    self.updateList(_.map(self.list, function (item) {
                        item.isComplete = checked;
                        return item;
                    }));
                }
            });
    },
    onClearCompleted: function () {
        var self = this;
        request.post('http://localhost:3000/api/todo/clearcompleted')
            .end(function (err, res) {
                if (res.success) {
                    self.updateList(_.filter(self.list, function (item) {
                        return true;
                    }));
                }
            });
    },
    // called whenever we change a list. normally this would mean a database API call
    updateList: function (list) {
        this.list = list;
        this.trigger(list); // sends the updated list to all listening components (TodoApp)
    },
    // this will be called by all listening components as they register their listeners
    getInitialState: function () {
        var self = this;

        self.getTodoList(function (res) {
            self.list = res.body;
            self.trigger(res.body)
        });
    },
    getTodoList: function (callback) {
        request.get('http://localhost:3000/api/todo')
            .end(function (err, res) {
                callback(res);
            });
    }
});
module.exports = TodoStore;

