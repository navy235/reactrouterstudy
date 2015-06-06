/**
 * Created by hshen on 5/15/2015.
 */
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var connectToStores = require('fluxible/addons/connectToStores');
var TodoStore = require('../../stores/fluxibleTodoStore');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var TodoActions = require('../../actions/fluxibleTodo');
var TodoHeader = require("./TodoHeader");
var TodoFooter = require("./TodoFooter");
var TodoApp = React.createClass({

    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },

    mixins: [FluxibleMixin],

    statics: {
        storeListeners: [TodoStore],

        fetchData: function (context, params, query, done) {
            context.executeAction(TodoActions.ReceiveTodo, {}, done);
        }
    },

    getInitialState: function() {
        return this.getStateFromStores();
    },

    getStateFromStores: function () {
        return {
            items: this.getStore(TodoStore).getAll()
        };
    },

    onChange: function() {
        this.setState(this.getStateFromStores());
    },

    render: function () {

        return (
            <div id="todoapp">
                <TodoHeader />
                <RouteHandler items={this.state.items} />
                <TodoFooter items={this.state.items} />
            </div>
        );
    }
});


module.exports = TodoApp;