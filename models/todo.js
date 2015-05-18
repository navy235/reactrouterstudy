/**
 * Created by hshen on 5/18/2015.
 */
var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost/todo');

var TodoSchema = new mongoose.Schema({
    label: String,
    isComplete: Boolean,
    created: {type: Date, default: Date.now}
});

var Todo = db.model('Todo', TodoSchema);

module.exports = Todo;