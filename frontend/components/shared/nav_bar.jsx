var React = require('react');
var hashHistory = require('react-router').hashHistory;
var Modal = require("react-modal");

var PatientStore = require('../../stores/patient_store.js');
var DoctorStore = require('../../stores/doctor_store.js');
var PatientActions = require('../../actions/patient_actions.js');
var DoctorActions = require('../../actions/doctor_actions.js');
var AuthForm = require('../auth/auth_form.jsx');
var AuthActions = require('../../actions/auth_actions.js');

module.exports = React.createClass({
  getInitialState: function() {
    var username = "";
    // if (PatientStore.currentPatient()) {
    //   debugger;
    //   username = PatientStore.currentPatient().first_name;
    // } else if (DoctorStore.currentDoctor()) {
    //   username = "Dr. " + DoctorStore.currentDoctor().last_name;
    // }
    return({ username: username });
  },

  componentDidMount: function() {
    this.patientListener = PatientStore.addListener(this._receiveUser);
    this.doctorListener = DoctorStore.addListener(this._receiveUser);
    PatientActions.fetchCurrentPatient();
    DoctorActions.fetchCurrentDoctor();
  },

  _receiveUser: function() {
    var patient = PatientStore.currentPatient();
    var doctor = DoctorStore.currentDoctor();

    if (patient) {
      this.setState({username: patient.first_name});
    } else if (doctor) {
      this.setState({username: "Dr. " + doctor.last_name});
    } else {
      this.setState({username: null});
    }
  },

  redirect: function() {
    hashHistory.push("/");
  },

  logo: (
    <div className="navbar-left nav-block">
      <a href="#" onClick={this.redirect}>
        <img
          src="http://i.imgur.com/yVQrigv.png?1"
          className="logo" />
      </a>
    </div>
  ),

  current_user: function() {
      if (this.state.username) {
        return (
          <div className="nav-button">
            <div className="nav navbar-nav navbar-right nav-button">
              <button
                className="btn btn-default"
                onClick={this.logout}>Logout</button>
            </div>
            <div className="nav navbar-nav navbar-right nav-button">
              Welcome, {this.state.username}
            </div>
          </div>
        );
      } else {
        return (
          <div className="nav navbar-nav navbar-right nav-button">
            <button
              className="btn btn-default"
              onClick={this.openCreateModal}>Get Started for FREE</button>
            <button
              className="btn btn-default"
              onClick={this.openSignInModal}>Sign In</button>
          </div>
        );
      }
  },

  options: function(){
    return (
      <div className="nav navbar-nav navbar-right nav-button">

      </div>
    );
  },

  openSignInModal: function(){
    AuthActions.openSignInForm();
  },

  openCreateModal: function(){
    AuthActions.openCreateForm();
  },

  closeModal: function(){
    AuthActions.closeForm();
  },

  logout: function(){
    if (PatientStore.currentPatient()) {
      PatientActions.logout();
    } else if (DoctorStore.currentDoctor()) {
      DoctorActions.logout();
    }
  },

  render: function() {
    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            {this.logo}
            {this.current_user()}
          </div>
        </nav>
    );
  }
});
