var React = require('react');

var DoctorStore = require('../../../stores/doctor_store.js');
var PatientSearch = require('./patients/patient_search.jsx');
var PatientDetail = require('./patients/patient_detail.jsx');

var Tabs = React.createClass({

  getInitialState: function() {
    return {
      tabPane: "patients",
      patients: DoctorStore.currentDoctor().patients,
      viewPatient: null
    };
  },

  componentDidMount: function() {
    this.doctorListener = DoctorStore.addListener(this._updatePatients);
  },

  _updatePatients: function() {
    if (DoctorStore.currentDoctor()){
      this.setState({
        patients: DoctorStore.currentDoctor().patients,
        viewPatient: DoctorStore.viewPatient()
      });
    }
  },

  togglePatients: function (event) {
    event.preventDefault();
    this.setState({ tabPane: "patients" });
  },

  toggleConversations: function (event) {
    event.preventDefault();
    this.setState({ tabPane: "conversations" });
  },

  patientsClass: function() {
    if (this.state.tabPane === "patients") {
      return "active";
    }
    return "";
  },

  conversationClass: function() {
    if (this.state.tabPane === "conversations") {
      return "active";
    }
    return "";
  },

  tabLabels: function() {
    return(
      <ul className="nav nav-tabs">
        <li
          onClick={this.togglePatients}
          className={this.patientsClass()}>
          <a href="/#/ddashboard">Patients</a></li>
        <li
          onClick={this.toggleConversations}
          className={this.conversationClass()}>
          <a href="/#/ddashboard">Conversations</a></li>
      </ul>
    );
  },

  patientDetail: function() {
    if (this.state.viewPatient && this.state.viewPatient.email) {
      return <PatientDetail patient={this.state.viewPatient} />;
    } else {
      return <div></div>;
    }
  },

  tabContent: function() {
    var content;
    switch(this.state.tabPane) {
      case "patients":
        content = (
          <div className="container search-section">
            <PatientSearch patients={this.state.patients} />
            {this.patientDetail()}
          </div>
        );
        break;
      case "conversations":
        content = <div>"conversations"</div>;
        break;
    }

    return(
      <div className="container tab-content">
        {content}
      </div>
    );
  },

  render: function() {
    return (
      <div className="tab-view">
        <h2>My Dashboard</h2>
        {this.tabLabels()}
        {this.tabContent()}
      </div>
    );
  }

});

module.exports = Tabs;
