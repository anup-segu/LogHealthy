var React = require('react');

var LogsIndex = require('./logs/logs_index.jsx');
var LogActions = require('../../../actions/log_actions.js');
var DashboardActions = require('../../../actions/dashboard_actions.js');
var PatientStore = require('../../../stores/patient_store.js');
var DashboardStore = require('../../../stores/dashboard_store.js');
var ConversationStore = require('../../../stores/conversation_store.js');
var GlucoseChart = require('./progress/glucose_chart.jsx');
var ConversationThread = require('./conversations/conversation_thread.jsx');

var Tabs = React.createClass({
  getInitialState: function() {
    return {
      viewWidth: "default",
      tabPane: "logs",
      subTab: "inbox",
      logData: PatientStore.currentPatient().logs,
      doctor: PatientStore.currentPatient().doctor,
      contactDoctor: false
    };
  },

  componentDidMount: function() {
    this.patientListener = PatientStore.addListener(this._updateLogData);
    this.dashboardListener = DashboardStore.addListener(this._updateView);
    this.conversationListener = ConversationStore.addListener(this._openNewConveration);
  },

  componentWillUnmount: function() {
    this.dashboardListener.remove();
    this.patientListener.remove();
    this.conversationListener.remove();
  },

  _updateView: function() {
    var tab = DashboardStore.tabStatus();

    if (tab === "default") {
      tab = "logs";
    }

    if (DashboardStore.sidebarStatus()) {
      this.setState({
        viewWidth: "collapse",
        tabPane: tab ? tab : "logs",
        subTab: DashboardStore.subTabStatus() ? DashboardStore.subTabStatus() : "inbox"
      });
    } else {
      this.setState({
        viewWidth: "expand",
        tabPane: tab ? tab : "logs",
        subTab: DashboardStore.subTabStatus() ? DashboardStore.subTabStatus() : "inbox"
      });
    }
  },

  _updateLogData: function() {
    if (PatientStore.currentPatient()){
      this.setState({
        logData: PatientStore.currentPatient().logs,
        doctor: PatientStore.currentPatient().doctor
      });
    }
  },

  _openNewConveration: function() {
    if (ConversationStore.conversationTabStatus()) {
      this.setState({
        tabPane: "conversations",
        contactDoctor: true
      });
    }
  },

  toggleLogs: function() {
    LogActions.closeForm();
    DashboardActions.openTab("logs");
    // this.setState({ tabPane: "logs" });
  },

  toggleProgress: function() {
    LogActions.closeForm();
    DashboardActions.openTab("progress");
    // this.setState({ tabPane: "progress" });
  },

  toggleConversations: function() {
    LogActions.closeForm();
    DashboardActions.openTab("conversations", "inbox");
  },

  logClass: "active",

  progressClass: "",

  conversationClass: "",

  tabLabels: function() {
    return(
      <ul className="nav nav-tabs">
        <li
          onClick={this.toggleLogs}
          className={this.logClass}>
          <a href="/#/pdashboard">Logs</a></li>
        <li
          onClick={this.toggleProgress}
          className={this.progressClass}>
          <a href="/#/pdashboard">Progress</a></li>
        <li
          onClick={this.toggleConversations}
          className={this.conversationClass}>
          <a href="/#/pdashboard">Conversations</a></li>
      </ul>
    );
  },

  tabContent: function() {
    var content;
    switch(this.state.tabPane) {
      case "logs":
        content = (
          <div className="container logs-list-container">
            <LogsIndex logs={this.state.logData}/>
          </div>
        );
        this.logClass = "active";
        this.progressClass = "";
        this.conversationClass = "";
        break;
      case "progress":
        content = (
          <div className="chart-container">
              <GlucoseChart glucose={this.state.logData} />
          </div>
        );
        this.logClass = "";
        this.progressClass = "active";
        this.conversationClass = "";
        break;
      case "conversations":
        content = (
          <div className="container conversation-section">
            <ConversationThread
              doctor={this.state.doctor}
              tab={this.state.subTab}/>
          </div>
        );
          this.logClass = "";
          this.progressClass = "";
          this.conversationClass = "active";
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
        <h2 className="dashboard-header">My Dashboard</h2>
        {this.tabLabels()}
        {this.tabContent()}
      </div>
    );
  }

});

module.exports = Tabs;
