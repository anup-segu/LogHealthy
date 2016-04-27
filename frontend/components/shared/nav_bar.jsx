var React = require('react');
var hashHistory = require('react-router').hashHistory;

var PatientStore = require('../../stores/patient_store.js');
var DoctorStore = require('../../stores/doctor_store.js');
var PatientActions = require('../../actions/patient_actions.js');
var DoctorActions = require('../../actions/doctor_actions.js');


module.exports = React.createClass({
  getInitialState: function() {
    var username;
    if (PatientStore.currentPatient()) {
      username = PatientStore.currentPatient().first_name;
    } else if (DoctorStore.currentDoctor()) {
      username = "Dr. " + DoctorStore.currentDoctor().last_name;
    }
    return({username: username});
  },

  componentDidMount: function() {
    this.patientListener = PatientStore.addListener(this._receivePatient);
    this.doctorListener = DoctorStore.addListener(this._receiveDoctor);
    PatientActions.fetchCurrentPatient();
    DoctorActions.fetchCurrentDoctor();
  },

  _receivePatient: function() {
    this.setState({username: PatientStore.currentPatient().first_name});
  },

  _receiveDoctor: function() {
    this.setState({username: "Dr. " + DoctorStore.currentDoctor().last_name});
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
              <button className="btn btn-default">Logout</button>
            </div>
            <div className="nav navbar-nav navbar-right nav-button">
              Welcome, {this.state.username}
            </div>
          </div>
        );
      } else {
        return (
          <div className="nav navbar-nav navbar-right nav-button">
            <button className="btn btn-default">Log In</button>
          </div>
        );
      }
  },

  options: (
    <div className="nav navbar-nav navbar-right nav-button">
      <button className="btn btn-default">
        <span
          className="glyphicon glyphicon-menu-hamburger"
          aria-hidden="true"></span>
      </button>
    </div>
  ),

  render: function() {
    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            {this.logo}
            {this.current_user()}
            {this.options}
          </div>
        </nav>
    );
  }
});

// ../../../app/assets/images/logo.png
