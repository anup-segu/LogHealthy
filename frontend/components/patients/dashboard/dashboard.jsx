var React = require('react');

var Sidebar = require('./sidebar.jsx');
var Tabs = require('./tabs.jsx');
var PatientStore = require('../../../stores/patient_store');
var PatientActions = require('../../../actions/patient_actions');

var Dashboard = React.createClass({
  getInitialState: function() {
    if (PatientStore.currentPatient()) {
      return {render: true};
    }
    return {render: false};
  },

  componentDidMount: function() {
    this.patientListener = PatientStore.addListener(this._checkLogin);

  },

  componentWillUnmount: function() {
    this.patientListener.remove();
  },

  _checkLogin: function() {
    var patient = PatientStore.currentPatient();
    if (patient) {
      this.setState({ render: true });
    } else {
      this.setState({ render: false });
    }
  },

  render: function() {
    if (this.state.render) {
      return (
        <div className="container-fluid content-view">
          <Sidebar />
          <div className="container dashboard">
            <Tabs />
          </div>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }

});

module.exports = Dashboard;
