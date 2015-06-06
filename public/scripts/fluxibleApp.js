
var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var app = new Fluxible({
    component: require('./routes.jsx')
});

app.plug(fetchrPlugin({
    xhrPath: '/api'
}));
app.plug(require('./utils/RouterPlugin')());

app.registerStore(require('./stores/fluxibleTodoStore'));
app.registerStore(require('./stores/ApplicationStore'));

module.exports = app;
