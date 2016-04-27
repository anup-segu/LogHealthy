// import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    Link = require('react-router').Link,
    hashHistory = require('react-router').hashHistory;

var AuthForm = require('./components/auth/auth_form.jsx'),
    NavBar = require('./components/shared/nav_bar.jsx');


var App = React.createClass({
  render: function () {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <AuthForm />
          {this.props.children}
        </div>
      </div>
    );
  }
});

// add your routes here
var routes = (
  <Route path="/" component={App}>
  </Route>
);

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(
    <Router history={hashHistory} routes={routes} />,
    document.getElementById('root')
  );
});
