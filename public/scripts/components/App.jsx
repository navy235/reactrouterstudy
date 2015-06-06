/**
 * Created by hshen on 5/14/2015.
 */
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var ApplicationStore = require('../stores/ApplicationStore');
var provideContext = require('fluxible/addons/provideContext');

var App = React.createClass({

    //mixins: [FluxibleMixin],

    //statics: {
    //    storeListeners: [ApplicationStore]
    //},
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },
    //onChange: function () {
    //    var state = this.getStore(ApplicationStore).getState();
    //    this.setState(state);
    //},
    render() {
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
                        <Link to="todofilter"  params={{status: "all"}} >todo</Link>
                    </li>
                    <li>
                        <a href="/notfound">notfound</a>
                    </li>
                    <li>
                        <a href="/redirect">redirect</a>
                    </li>
                </ul>
                <h1>App</h1>
                <RouteHandler/>
            </div>
        )
    }
});
App = provideContext(App);

module.exports = App;