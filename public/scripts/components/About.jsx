
/**
 * Created by hshen on 5/14/2015.
 */
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var About = React.createClass({
    render () {
        return (
            <div>
                <h1>About</h1>
                <RouteHandler/>
            </div>
        )
    }
});
module.exports=About;