/**
 * Created by hshen on 5/15/2015.
 */
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Reflux = require('reflux');
var TodoActions = require('../../actions/fluxibleTodo');
var TodoItem = require('./TodoItem');
var Cn = require('classname');
var _ = require("underscore");


var TodoMain = React.createClass({

    mixins: [Router.State],

    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },
    toggleAll: function (evt) {
        this.context.executeAction(TodoActions.ToggleAllTodo, {
            isComplete:evt.target.checked
        });
    },
    render: function () {
        var filteredList;
        switch (this.getParams().status) {
            case 'completed':
                filteredList = _.filter(this.props.items, function (item) {
                    return item.isComplete;
                });
                break;
            case 'active':
                filteredList = _.filter(this.props.items, function (item) {
                    return !item.isComplete;
                });
                break;
            default:
                filteredList = this.props.items;
        }
        var classes = Cn({
            "hidden": this.props.items.length < 1
        });
        return (
            <section id="main" className={classes}>
                <input id="toggle-all" type="checkbox" onChange={this.toggleAll} />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul id="todo-list">
                        { filteredList.map(function (item) {
                            return <TodoItem label={item.label} isComplete={item.isComplete} id={item._id} key={item._id}/>;
                        })}
                </ul>
            </section>
        );
    }
});
module.exports = TodoMain;