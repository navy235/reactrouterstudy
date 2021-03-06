/**
 * Created by hshen on 5/15/2015.
 */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var TodoActions = require('../../actions/fluxibleTodo');

var _ = require("underscore");
var Cn = require('classname');
var TodoFooter = React.createClass({

    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },

    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },

    onClearCompleted: function () {
        this.context.executeAction(TodoActions.ClearCompleted);
    },
    render: function () {
        var nbrcompleted = _.filter(this.props.items, "isComplete").length,
            nbrtotal = this.props.items.length,
            nbrincomplete = nbrtotal - nbrcompleted,
            clearButtonClass = Cn({hidden: nbrcompleted < 1}),
            footerClass = Cn({hidden: !nbrtotal}),
            completedLabel = "Clear completed (" + nbrcompleted + ")",
            itemsLeftLabel = nbrincomplete === 1 ? " item left" : " items left";
        return (
            <footer id="footer" className={footerClass}>
                <span id="todo-count">
                    <strong>{nbrincomplete}</strong>{itemsLeftLabel}</span>
                <ul id="filters">
                    <li>
                        <Link activeClassName="selected" to="todofilter"  params={{status: "all"}}>All</Link>
                    </li>
                    <li>
                        <Link activeClassName="selected" to="todofilter"  params={{status: "active"}}>Active</Link>
                    </li>
                    <li>
                        <Link activeClassName="selected" to="todofilter"  params={{status: "completed"}}>Completed</Link>
                    </li>
                </ul>
                <button id="clear-completed" className={clearButtonClass} onClick={this.onClearCompleted}>{completedLabel}</button>
            </footer>
        );
    }
});

module.exports = TodoFooter;