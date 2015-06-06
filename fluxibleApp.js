require('node-jsx').install({harmony: true, extension: '.jsx'});
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var app = express();
var dust = require('express-dustjs');
var React = require('react');
var Router = require('react-router');
var ApiRoutes = require('./routes/index');
var fluxibleApp = require("./public/scripts/fluxibleApp");
var FluxibleComponent = require('fluxible/addons/FluxibleComponent');
var navigateAction = require('./public/scripts/actions/navigate');
var fetchData=require('./public/scripts/utils/fetchData');

var routes=require('./public/scripts/routes.jsx');

var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/todo', function (err) {
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var client_webpack = require('./webpack.client.config');

// Dustjs settings
dust._.optimizers.format = function (ctx, node) {
    return node
}

// Define custom Dustjs helper
dust._.helpers.demo = function (chk, ctx, bodies, params) {
    return chk.w('demo')
}

// Use Dustjs as Express view engine
app.engine('dust', dust.engine({
    // Use dustjs-helpers
    useHelpers: true
}))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(csrf({cookie: true}));

app.set('view engine', 'dust')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));

// if using express it might look like this
// Get access to the fetchr plugin instance
var fetchrPlugin = fluxibleApp.getPlugin('FetchrPlugin');

// Register our todos REST service
fetchrPlugin.registerService(require('./services/todo'));

// Set up the fetchr middleware
app.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

app.get('*', function (req, res) {
    var context = fluxibleApp.createContext({
        req: req, // The fetchr plugin depends on this
        xhrContext: {
            _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        }
    });

    var router = Router.create({
        routes: routes,
        location: req.path
    });

    router.run(function (Handler, routerState) {
        fetchData(context, routerState, function(err) {
            var exposed = fluxibleApp.dehydrate(context);
            var Component = React.createFactory(Handler);
            var content = React.renderToString(
                React.createElement(
                    FluxibleComponent,
                    {context: context.getComponentContext()},
                    Component()
                )
            );
            res.render('index/index', {content: content, exposed: exposed});
        })

        //context.executeAction(navigateAction, state, function () {
        //    var exposed = fluxibleApp.dehydrate(context);
        //    var Component = React.createFactory(Handler);
        //    var content = React.renderToString(
        //        React.createElement(
        //            FluxibleComponent,
        //            {context: context.getComponentContext()},
        //            Component()
        //        )
        //    );
        //    res.render('index/index', {content: content, exposed: exposed});
        //});
    });
});

module.exports = app;
