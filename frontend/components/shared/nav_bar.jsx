var React = require('react');
var hashHistory = require('react-router').hashHistory;
var Modal = require("react-modal");
var Fade = require('react-bootstrap/lib/Fade');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Popover = require('react-bootstrap/lib/Popover');

var PatientStore = require('../../stores/patient_store.js');
var DoctorStore = require('../../stores/doctor_store.js');
var DashboardStore = require('../../stores/dashboard_store.js');
var PatientActions = require('../../actions/patient_actions.js');
var DoctorActions = require('../../actions/doctor_actions.js');
var LogActions = require('../../actions/log_actions.js');
var DashboardActions = require('../../actions/dashboard_actions.js');
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

    return({ username: username, dropDown: false, sideOptions: false });
  },

  componentDidMount: function() {
    this.patientListener = PatientStore.addListener(this._receiveUser);
    this.doctorListener = DoctorStore.addListener(this._receiveUser);
    this.dashboardListener = DashboardStore.addListener(this._updateOptions);
    PatientActions.fetchCurrentPatient();
    DoctorActions.fetchCurrentDoctor();
  },

  _updateOptions: function() {
    if (DashboardStore.sidebarStatus()) {
      this.setState({ sideOptions: false });
    } else {
      this.setState({ sideOptions: true });
    }
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

  demoPatient: function (event) {
    event.preventDefault();
    this.dropDownClose();
    PatientActions.login({ email: "patient@demo.com", password: "password" });
  },

  demoDoctor: function (event) {
    event.preventDefault();
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
            <div className="nav navbar-nav navbar-right">
              <div className="container welcome-message">
                Welcome, {this.state.username}
              </div>

              <button
                className="btn btn-primary btn-login"
                onClick={this.logout}>
                <span
                  className="glyphicon glyphicon-lock"
                  aria-hidden="true"></span> Logout
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="nav navbar-nav navbar-right nav-button">
            <div className="btn-group btn-dropdown-login">
              <button type="button"
                className="btn btn-default dropdown-toggle btn-login"
                onClick = { this.dropdownToggle }>Demo <span className="caret"></span>
              </button>
              <ul
                className={ this.dropDownClass() }
                onBlur = { this.dropDownClose }>
                <li className="demo-list-patient"
                  onClick={this.demoPatient}>
                  <a href="/">Demo as Patient</a></li>
                <li className="demo-list-doctor"
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

  launchLog: function (event) {
    event.preventDefault();
    LogActions.openForm();
  },

  contactDoctor: function (event) {
    event.preventDefault();
    LogActions.closeForm();
    DashboardActions.openTab("conversations", "new");
  },

  contactPatient: function (event) {
    event.preventDefault();
    DashboardActions.openTab("conversations", "new");
  },

  createPatientDoctor: function (event) {
    event.preventDefault();
    AuthActions.openPatientDoctorForm();
  },

  patientDoctorOption: function() {
    if (PatientStore.currentPatient().doctor.first_name) {
      return (
        <li className="options-action"
          onClick={this.contactDoctor}>
          <a>Contact Doctor</a></li>
      );
    } else {
      return (
        <li className="options-action"
          onClick={this.createPatientDoctor}>
          <a>Add Doctor</a></li>
      );
    }
  },

  popOverPatientContent: function() {
    return (
      <Popover
        id="action-popover"
        className="action-popover">
        <ul className="options-menu">
          <li className="options-action"
            onClick={this.launchLog}>
            <a>Create a new log</a></li>
          {this.patientDoctorOption()}
        </ul>
      </Popover>
    );
  },

  popoOverDoctorContent: function() {
    var contactPatient;

    if (DoctorStore.currentDoctor().patients.length > 0) {
      contactPatient = (
        <li className="options-action"
          onClick={this.contactPatient}>
          <a>Contact Patient</a></li>
      );
    }

    return (
      <Popover
        id="action-popover"
        className="action-popover">
        <ul className="options-menu">
          {contactPatient}
          <li className="options-action"
            onClick={this.createPatientDoctor}>
            <a>Add Patient</a></li>
        </ul>
      </Popover>
    );
  },

  popOverContent: function() {
    if (this.state.username.indexOf("Dr.") !== 0) {
      return this.popOverPatientContent();
    } else if (this.state.username) {
      return this.popoOverDoctorContent();
    } else {
      return;
    }
  },

  optionsToggle: function() {
    LogActions.closeForm();
    DashboardActions.expandSidebar();
  },

  options: function(){
    if (this.state.username) {
      return (
        <Fade in={this.state.sideOptions}>
          <div className="nav navbar-nav navbar-left nav-button">
            <button
              className="btn btn-options-toggle"
              onClick={this.optionsToggle}>
              <span
                className="glyphicon glyphicon-menu-hamburger"
                aria-hidden="true"></span>
            </button>
            <OverlayTrigger
              trigger="click"
              rootClose placement="bottom"
              overlay={this.popOverContent()}>
              <button
                className="btn btn-actions-toggle">
                <span
                  className="glyphicon glyphicon-plus"
                  aria-hidden="true"></span>
              </button>
            </OverlayTrigger>
          </div>
        </Fade>
      );
    } else {
      return;
    }
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
            {this.options()}
            {this.current_user()}
          </div>
        </nav>
    );
  }
});
