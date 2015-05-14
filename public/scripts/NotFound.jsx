/**
 * Created by hshen on 5/14/2015.
 */
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var NotFound = React.createClass({
    render () {
        return (
            <div>
                <h1>!  NotFound</h1>
            </div>
        )
    }
});
module.exports=NotFound;