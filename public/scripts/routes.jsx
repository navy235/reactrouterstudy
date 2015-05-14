var React = require('react');

var About = React.createClass({
    render: function () {
        return <h2>About</h2>;
    }
});

var Inbox = React.createClass({
    render: function () {
        return <h2>Inbox</h2>;
    }
});

var Home = React.createClass({
    render: function () {
        return <h2>Home</h2>;
    }
});

var App = React.createClass({
    render() {
        var Child;
        switch (this.props.route) {
            case 'about':
                Child = About;
                break;
            case 'inbox':
                Child = Inbox;
                break;
            default:
                Child = Home;
        }
        console.log('render');
        return (

            <div>
                <ul>
                    <li><a href="#">home</a></li>
                    <li><a href="#inbox">Index</a></li>
                    <li><a href="#about">about</a></li>

                    </ul>
                <h1>App</h1>
                <Child/>
            </div>
        )
    }
});

function render() {
    var route = window.location.hash.substr(1);
    React.render(<App route={route} />, document.body);
}

window.addEventListener('hashchange', render);
render(); // render initially

module.exports=App;