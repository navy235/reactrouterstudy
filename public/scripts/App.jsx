/**
 * Created by hshen on 5/14/2015.
 */
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
    render () {
        return (
            <div>
                <ul>
                    <li><a href="#">home</a></li>
                    <li><a href="#inbox">Index</a></li>
                    <li><a href="#about">about</a></li>
                </ul>
                <h1>App</h1>
                <RouteHandler/>
            </div>
        )
    }
});
module.exports=App;