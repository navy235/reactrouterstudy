/**
 * Created by hshen on 5/14/2015.
 */
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var App = React.createClass({
    render () {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="home" >home</Link>
                    </li>
                    <li>
                        <Link to="inbox" >inbox</Link>
                    </li>
                    <li>
                        <Link to="about" >about</Link>
                    </li>
                    <li>
                        <Link to="todo" >todo</Link>
                    </li>
                    <li>
                        <a href="/notfound">notfound</a></li>
                    <li><a href="/redirect">redirect</a></li>
                </ul>
                <h1>App</h1>
                <RouteHandler/>
            </div>
        )
    }
});
module.exports=App;