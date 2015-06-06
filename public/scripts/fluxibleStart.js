/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global App, document, window */

var React = require('react');
var app = require('./fluxibleApp');
var dehydratedState = window.App; // Sent from the server
var Router = require('react-router');
var HistoryLocation = Router.HistoryLocation;
var navigateAction = require('./actions/navigate');
var FluxibleComponent = require('fluxible/addons/FluxibleComponent');
var fetchData=require('./utils/fetchData');
var routes=require('./routes');
window.React = React; // For chrome dev tool support



function RenderApp(context, Handler){
    var mountNode = document.getElementById('app');
    var Component = React.createFactory(Handler);
    React.render(
        React.createElement(
            FluxibleComponent,
            { context: context.getComponentContext() },
            Component()
        ),
        mountNode,
        function () {

        }
    );
}

app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.context = context;

    var firstRender = true;

    var router = Router.create({
        routes: routes,
        location: Router.HistoryLocation,
        transitionContext: context
    });
    app.getPlugin('RouterPlugin').setRouter(router);

    router.run(function (Handler, state) {
        if (firstRender) {
            // Don't call the action on the first render on top of the server rehydration
            // Otherwise there is a race condition where the action gets executed before
            // render has been called, which can cause the checksum to fail.
            RenderApp(context, Handler);
            firstRender = false;
        } else {
            context.executeAction(navigateAction, state, function () {
                RenderApp(context, Handler);
                fetchData(context, state);
            });
        }
    });
});
