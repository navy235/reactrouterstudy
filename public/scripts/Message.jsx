/**
 * Created by hshen on 5/14/2015.
 */
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Message = React.createClass({

    getInitialState(){
      return {
          message:'loading'
      }
    },

    componentDidMount: function () {
        // from the path `/inbox/messages/:id`
        var id = this.props.params.id;

        this.setState({message: 'componentDidMount' + id});

    },
    render: function () {
        return (
            <div>
                {this.state.message}
            </div>
        );
    }

});

module.exports = Message;