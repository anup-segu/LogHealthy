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
    PatientActions.fetchCurrentPatient();
    DoctorActions.fetchCurrentDoctor();

    if (PatientStore.currentPatient()) {
      username = PatientStore.currentPatient().first_name;
    } else if (DoctorStore.currentDoctor()) {
      username = "Dr. " + DoctorStore.currentDoctor().last_name;
    }

    return({ username: username, dropDown: false });
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

  dropdownToggle: function() {
    if (this.state.dropDown) {
      this.setState({ dropDown: false });
    } else {
      this.setState({ dropDown: true });
    }
  },

  dropDownClose: function (event) {
    this.setState({ dropDown: false });
  },

  dropDownClass: function() {
    if (this.state.dropDown) {
      return "dropdown-menu demo-dropdown";
    } else {
      return "dropdown-menu";
    }
  },

  demoPatient: function() {
    this.dropDownClose();
    PatientActions.login({ email: "patient@demo.com", password: "password" });
  },

  demoDoctor: function() {
    this.dropDownClose();
    PatientActions.login({ email: "doctor@demo.com", password: "password" });
  },

  redirect: function() {
    hashHistory.push("/");
  },

  logo: (
    <div className="navbar-left nav-block">
    </div>
  ),

  current_user: function() {
      if (this.state.username) {
        return (
          <div className="nav-button">
            <div className="nav navbar-nav navbar-right nav-button">
              <button
                className="btn btn-primary btn-login"
                onClick={this.logout}>
                <span
                  className="glyphicon glyphicon-lock"
                  aria-hidden="true"></span> Logout
              </button>
            </div>
            <div className="nav navbar-nav navbar-right nav-button">
              <div className="container welcome-message">
                Welcome, {this.state.username}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="nav navbar-nav navbar-right nav-button">
            <div className="btn-group btn-dropdown-login">
              <button type="button"
                className="btn btn-default btn-login">Demo</button>
              <button type="button"
                className="btn btn-default dropdown-toggle btn-login"
                onClick = { this.dropdownToggle }>
                <span className="caret"></span>
              </button>
              <ul
                className={ this.dropDownClass() }
                onBlur = { this.dropDownClose }>
                <li
                  onClick={this.demoPatient}>
                  <a href="/">Demo as Patient</a></li>
                <li
                  onClick={this.demoDoctor}>
                  <a href="/">Demo as Doctor</a></li>
              </ul>
            </div>
            <button
              className="btn btn-success btn-custom"
              onClick={this.openCreateModal}>Get Started for FREE</button>
            <button
              className="btn btn-primary btn-login"
              onClick={this.openSignInModal}>
              <span
                className="glyphicon glyphicon-lock"
                aria-hidden="true"></span> Sign In
            </button>
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
        <nav className="navbar navbar-default navbar-custom">
          <div className="container-fluid navbar-inner">
            {this.logo}
            {this.current_user()}
          </div>
        </nav>
    );
  }
});
