var React = require('react');
var Router = require('react-router');
var {
    Route,
    DefaultRoute,
    NotFoundRoute,
    Redirect
    }=Router;
var {
    App,
    Home,
    NotFound,
    About,
    Inbox,
    Message
    }=require('./components');
// declare our routes and their hierarchy
var routes = (
    <Route path="/" handler={App}>
        <DefaultRoute name="home" handler={Home}/>
        <Route name="about" path="about" handler={About}/>
        <Route name="inbox" path="inbox" handler={Inbox}>
            <Route name="message" path="messages/:id" handler={Message}/>
            <Route path="/archive/messages/:id" handler={Message}/>
        </Route>
        <Redirect from="redirect" to="about" />
        <NotFoundRoute handler={NotFound} />
    </Route>
);

module.exports = routes;