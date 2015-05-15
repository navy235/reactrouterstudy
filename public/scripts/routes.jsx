var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect=Router.Redirect;
var App = require('./App')
var Home = require('./Home')
var NotFound = require('./NotFound')
var About = require('./About')
var Inbox = require('./Inbox')
var Message = require('./Message')
// declare our routes and their hierarchy
var routes = (
    <Route path="/" handler={App}>
        <DefaultRoute handler={Home}/>
        <Route name="about" path="about" handler={About}/>
        <Route path="inbox" handler={Inbox}>
            <Route path="messages/:id" handler={Message}/>
            <Route path="/archive/messages/:id" handler={Message}/>
        </Route>
        <Redirect from="redirect" to="about" />
        <NotFoundRoute handler={NotFound} />

    </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, document.body);
});

module.exports = routes;