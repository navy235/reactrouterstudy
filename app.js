var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var routes = require('./routes/index');
//var users = require('./routes/users');
var app = express();
var dust = require('express-dustjs');
require('node-jsx').install({harmony: true, extension: '.jsx'});
var React = require('react');
var Router = require('react-router');
var routes = require("./public/scripts/routes.jsx");

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

app.set('view engine', 'dust')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));

// if using express it might look like this
app.use(function (req, res) {
    // pass in `req.url` and the router will immediately match
    Router.run(routes, req.path, function (routeHandler) {
        var routeComponent=React.createFactory(routeHandler)
        var content = React.renderToString(routeComponent());
        res.render('index/index', {content: content});
    });
});

//app.use('/', routes);
//app.use('/users', users);


module.exports = app;
