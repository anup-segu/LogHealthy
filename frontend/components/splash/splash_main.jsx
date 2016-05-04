var React = require('react');
var hashHistory = require('react-router').hashHistory;

var AuthActions = require('../../actions/auth_actions.js');
var PatientActions = require('../../actions/patient_actions.js');
var DoctorActions = require('../../actions/doctor_actions.js');
var PatientStore = require('../../stores/patient_store.js');
var DoctorStore = require('../../stores/doctor_store.js');
var SplashDetail = require('./splash_detail.jsx');

var SplashBody = React.createClass({
  getInitialState: function() {
    return {render: true};
  },

  componentDidMount: function() {
    this.patientListener = PatientStore.addListener(this._checkLogin);
    this.doctorListener = DoctorStore.addListener(this._checkLogin);

    PatientActions.fetchCurrentPatient();
    DoctorActions.fetchCurrentDoctor();
  },

  _checkLogin: function() {
    var patient = PatientStore.currentPatient();
    var doctor = DoctorStore.currentDoctor();
    
    if (patient) {
      this.setState({ render: false });
    } else if (doctor) {
      this.setState({ render: false });
    } else {
      this.setState({ render: true });
    }
  },

  openCreateModal: function() {
    AuthActions.openCreateForm();
  },

  getStartedButton: function() {
    return <button
      className="btn btn-default btn-lg start-landing splash-button"
      onClick={this.openCreateModal}>Get Started for Free</button>;
  },

  getStartedLearn: function() {
    return <button
      className="btn btn-default btn-lg start-learn splash-button">Learn More</button>;
  },

  splashLanding: function() {
    if (this.state.render) {
      return (
        <div className="container-fluid splash-body">
          <div className="blockout blockout-space"></div>
          <div className="container splash-copy">
            <h1 className="text-center headline">Move Health Forward.</h1>
            <h4 className="text-center headline">LogHealthy is the easiest way for diabetic patients to</h4>
            <h4 className="text-center headline">track their glucose-and keep their doctor updated.</h4>

            <div className="container-fluid splash-btn-container">{this.getStartedButton()}</div>
          </div>
          <div className="container-fluid detail-content">
            <SplashDetail />
          </div>
        </div>
      );
    } else {
      return;
    }
  },

  render: function() {
    return (
      <div>
        { this.splashLanding() }
      </div>
    );
  }

});

module.exports = SplashBody;
