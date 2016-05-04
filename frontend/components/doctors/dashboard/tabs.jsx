var React = require('react');

var DoctorStore = require('../../../stores/doctor_store.js');
var DashboardStore = require('../../../stores/dashboard_store.js');
var PatientSearch = require('./patients/patient_search.jsx');
var PatientDetail = require('./patients/patient_detail.jsx');
var ConversationThread = require('./conversations/conversation_thread.jsx');

var Tabs = React.createClass({

  getInitialState: function() {
    return {
      viewWidth: "default",
      tabPane: "patients",
      patients: DoctorStore.currentDoctor().patients,
      viewPatient: null
    };
  },

  componentDidMount: function() {
    this.doctorListener = DoctorStore.addListener(this._updatePatients);
    this.dashboardListener = DashboardStore.addListener(this._updateView);
  },

  componentWillUnmount: function() {
    this.dashboardListener.remove();
  },

  _updateView: function() {
    if (DashboardStore.sidebarStatus()) {
      this.setState({ viewWidth: "collapse" });
    } else {
      this.setState({ viewWidth: "expand" });
    }
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

  conversationDetail: function() {
    return (
      <ConversationThread patients={this.state.patients}/>
    );
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
        content = (
          <div className="container conversation-section">
            {this.conversationDetail()}
          </div>
        );
        break;
    }

    return(
      <div className="container tab-content">
        {content}
      </div>
    );
  },

  tabClass: function() {
    if (this.state.viewWidth === "default") {
      return "tab-view";
    } else if (this.state.viewWidth === "expand") {
      return "tab-view tab-expand";
    } else if (this.state.viewWidth === "collapse") {
      return "tab-view tab-collapse";
    }
  },

  render: function() {
    return (
      <div className={this.tabClass()}>
        <h2>My Dashboard</h2>
        {this.tabLabels()}
        {this.tabContent()}
      </div>
    );
  }

});

module.exports = Tabs;
