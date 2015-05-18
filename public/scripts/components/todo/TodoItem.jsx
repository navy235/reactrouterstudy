/**
 * Created by hshen on 5/15/2015.
 */
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Reflux = require('reflux');
var TodoActions = require('../../actions/todo');
var Cn = require('classname');
var _ = require("underscore");

var TodoItem = React.createClass({
    propTypes: {
        label: React.PropTypes.string.isRequired,
        isComplete: React.PropTypes.bool.isRequired,
        id: React.PropTypes.string
    },
    mixins: [React.addons.LinkedStateMixin], // exposes this.linkState used in render
    getInitialState: function() {
        return {
            isEditing:false,
            editValue:this.props.label
        };
    },
    handleToggle: function(evt) {
        TodoActions.toggleItem(this.props.id,evt.target.checked);
    },
    handleEditStart: function(evt) {
        evt.preventDefault();
        // because of linkState call in render, field will get value from this.state.editValue
        this.setState({
            isEditing: true
        }, function() {
            this.refs.editInput.getDOMNode().focus();
        });
    },
    handleValueChange: function(evt) {
        var text = this.state.editValue; // because of the linkState call in render, this is the contents of the field
        // we pressed enter, if text isn't empty we blur the field which will cause a save
        if (evt.which === 13 && text) {
            this.refs.editInput.getDOMNode().blur();
        }
        // pressed escape. set editing to false before blurring so we won't save
        else if (evt.which === 27) {
            this.setState({ isEditing: false },function(){
                this.refs.editInput.getDOMNode().blur();
            });
        }
    },
    handleBlur: function() {
        var text = this.state.editValue; // because of the linkState call in render, this is the contents of the field
        // unless we're not editing (escape was pressed) or text is empty, save!
        if (this.state.isEditing && text) {
            TodoActions.editItem(this.props.id, text);
        }
        // whatever the outcome, if we left the field we're not editing anymore
        this.setState({isEditing:false});
    },
    handleDestroy: function() {
        TodoActions.removeItem(this.props.id);
    },
    render: function() {
        var classes = Cn({
            'completed': this.props.isComplete,
            'editing': this.state.isEditing
        });
        return (
            <li className={classes}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={!!this.props.isComplete} onChange={this.handleToggle} />
                    <label onDoubleClick={this.handleEditStart}>{this.state.editValue}</label>
                    <button className="destroy" onClick={this.handleDestroy}></button>
                </div>
                <input ref="editInput" className="edit" valueLink={this.linkState('editValue')} onKeyUp={this.handleValueChange} onBlur={this.handleBlur} />
            </li>
        );
    }
});

module.exports=TodoItem;