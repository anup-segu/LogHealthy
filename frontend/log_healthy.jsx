// import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    Link = require('react-router').Link,
    hashHistory = require('react-router').hashHistory;

var PatientForm = require('./components/auth/auth_form.jsx');


var App = React.createClass({
  render: function () {
    return (
      <div className="container-fluid">
        <h1>Welcome to LogHealthy</h1>
        <PatientForm />
        {this.props.children}
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
