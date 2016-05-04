var React = require('react');

var LogsIndex = require('./logs/logs_index.jsx');
var LogActions = require('../../../actions/log_actions.js');
var PatientStore = require('../../../stores/patient_store.js');
var DashboardStore = require('../../../stores/dashboard_store.js');
var GlucoseChart = require('./progress/glucose_chart.jsx');
var ConversationThread = require('./conversations/conversation_thread.jsx');

var Tabs = React.createClass({
  getInitialState: function() {
    return {
      viewWidth: "default",
      tabPane: "logs",
      logData: PatientStore.currentPatient().logs,
      doctor: PatientStore.currentPatient().doctor
    };
  },

  componentDidMount: function() {
    this.patientListener = PatientStore.addListener(this._updateLogData);
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

  _updateLogData: function() {
    if (PatientStore.currentPatient()){
      this.setState({
        logData: PatientStore.currentPatient().logs,
        doctor: PatientStore.currentPatient().doctor
      });
    }
  },

  toggleLogs: function() {
    this.setState({ tabPane: "logs" });
  },

  toggleProgress: function() {
    this.setState({ tabPane: "progress" });
  },

  toggleConversations: function() {
    this.setState({ tabPane: "conversations" });
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
            <ConversationThread doctor={this.state.doctor}/>
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
        <h2>My Dashboard</h2>
        {this.tabLabels()}
        {this.tabContent()}
      </div>
    );
  }

});

module.exports = Tabs;
