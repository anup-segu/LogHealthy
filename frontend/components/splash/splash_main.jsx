var React = require('react');

var AuthActions = require('../../actions/auth_actions.js');
var PatientStore = require('../../stores/patient_store.js');
var DoctorStore = require('../../stores/doctor_store.js');

var SplashBody = React.createClass({
  getInitialState: function() {
    return {render: true};
  },

  componentDidMount: function() {
    this.patientListener = PatientStore.addListener(this._checkLogin);
    this.doctorListener = PatientStore.addListener(this._checkLogin);
  },

  _checkLogin: function() {
    var patient = PatientStore.currentPatient();
    var doctor = DoctorStore.currentDoctor();
    if (patient || doctor) {
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
      onClick={this.openCreateModal}>Get Started Now</button>;
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
          <div className="container">
            <h1 className="text-center headline">Content Here</h1>
            <h4 className="text-center headline">Taglines Here</h4>
            <div className="blockout blockout-small"></div>
            <div className="container-fluid">{this.getStartedButton()}</div>
            <div className="blockout blockout-small"></div>
            <div className="container-fluid">{this.getStartedLearn()}</div>
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
