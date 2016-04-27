// import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

var React = require('react'),
    ReactDOM = require('react-dom'),
    Modal = require("react-modal"),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    Link = require('react-router').Link,
    hashHistory = require('react-router').hashHistory;

var AuthForm = require('./components/auth/auth_form.jsx'),
    NavBar = require('./components/shared/nav_bar.jsx'),
    SplashBody = require('./components/splash/splash_main.jsx');


var App = React.createClass({
  render: function () {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <AuthForm />
          {this.props.children}
        </div>
        <SplashBody />
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
  Modal.setAppElement(document.body);
  ReactDOM.render(
    <Router history={hashHistory} routes={routes} />,
    document.getElementById('root')
  );
});
