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
    SplashBody = require('./components/splash/splash_main.jsx'),
    DoctorStore = require('./stores/doctor_store.js'),
    PatientStore = require('./stores/patient_store.js'),
    PatientDashboard = require('./components/patients/dashboard/dashboard.jsx'),
    DoctorDashboard = require('./components/doctors/dashboard/dashboard.jsx');


var App = React.createClass({
  componentDidMount: function() {
    this.patientListener = PatientStore.addListener(this._navigateDashboard);
    this.doctorListener = DoctorStore.addListener(this._navigateDashboard);
  },

  _navigateDashboard: function() {
    if (PatientStore.currentPatient()) {
      hashHistory.push("/pdashboard");
    } else if (DoctorStore.currentDoctor()) {
      hashHistory.push("/ddashboard");
    } else {
      hashHistory.push("/");
    }
  },

  render: function () {
    return (
      <div className="app-render">
        <NavBar />
        <div className="container-fluid app-body">
          <AuthForm />
          <SplashBody />
          {this.props.children}
        </div>
        <div>

        </div>
      </div>
    );
  }
});

// add your routes here
var routes = (
  <Route path="/" component={App}>
    <Route path="pdashboard" component={PatientDashboard}></Route>
    <Route path="ddashboard" component={DoctorDashboard}></Route>
  </Route>
);

document.addEventListener("DOMContentLoaded", function(){
  Modal.setAppElement(document.body);
  ReactDOM.render(
    <Router history={hashHistory} routes={routes} />,
    document.getElementById('root')
  );
});
