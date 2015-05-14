/**
 * Created by hshen on 5/14/2015.
 */
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Inbox = React.createClass({
    render() {
        return (
            <div>
                <h1>Inbox</h1>
                <p>
                    <a href="#inbox/messages/3"> Message3</a><br/>
                    <a href="#archive/messages/4"> Message4</a>
                </p>
                <RouteHandler/>
            </div>
        )
    }
});
module.exports = Inbox;