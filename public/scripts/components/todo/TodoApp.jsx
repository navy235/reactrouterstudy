/**
 * Created by hshen on 5/15/2015.
 */
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Reflux = require('reflux');
var TodoStore = require('../../stores/todo');
var TodoHeader = require("./TodoHeader");
var TodoFooter = require("./TodoFooter");
var TodoApp = React.createClass({
    // this will cause setState({list:updatedlist}) whenever the store does trigger(updatedlist)
    mixins: [Reflux.connect(TodoStore, "list")],

    getInitialState() {
        return {
            list: []
        };
    },

    render: function () {
        return (
            <div id="todoapp">
                <TodoHeader />
                <RouteHandler list={this.state.list} />
                <TodoFooter list={this.state.list} />
            </div>
        );
    }
});

module.exports = TodoApp;