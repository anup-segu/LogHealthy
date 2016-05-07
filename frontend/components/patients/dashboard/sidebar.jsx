var React = require('react');

var LogForm = require('./logs/logs_form.jsx');
var PatientDoctorForm = require('../../auth/patient_doctor_form.jsx');
var LogActions = require('../../../actions/log_actions.js');
var AuthActions = require('../../../actions/auth_actions.js');
var DashboardActions = require('../../../actions/dashboard_actions.js');
var DashboardStore = require('../../../stores/dashboard_store.js');
var PatientStore = require('../../../stores/patient_store.js');

var Sidebar = React.createClass({

  getInitialState: function() {
    return ({buttonText: true, sidebar: "show" });
  },

  componentDidMount: function() {
    this.setState({buttonText: true, sidebar: "show" });
    this.resize = window.addEventListener("resize", this._updateButtonText);
    this.dashboardListener = DashboardStore.addListener(this._updateSidebar);
  },

  componentWillUnmount: function() {
    this.dashboardListener.remove();
    if (this.resize) {
      this.resize.remove();
    }
  },

  _updateSidebar: function() {
    if (DashboardStore.sidebarStatus()) {
      this.setState({ sidebar: "out" });
    } else {
      this.setState({ sidebar: "in" });
    }
  },

  _updateButtonText: function() {
    if ($(window).width() < 790) {
      this.setState({ buttonText: false });
    } else {
      this.setState({ buttonText: true });
    }
  },

  buttonText: function() {
    if (this.state.buttonText) {
      return (
        <span>
          <span
            className="glyphicon glyphicon-edit"
            aria-hidden="true"></span> Create a new log
        </span>
      );
    } else {
      return <span
        className="glyphicon glyphicon-edit"
        aria-hidden="true"></span>;
    }
  },

  buttonClass: function() {
    if (this.state.buttonText) {
      return "btn sidebar-btn";
    } else {
      return "btn sidebar-btn";
    }
  },

  openForm: function() {
    LogActions.openForm();
  },

  createConversation: function() {
    LogActions.closeForm();
    DashboardActions.openTab("conversations", "new");
  },

  collapse: function (event) {
    event.preventDefault();
    LogActions.closeForm();
    if (this.state.sidebar === "show" || this.state.sidebar === "out") {
      DashboardActions.collapseSidebar();
    } else {
      DashboardActions.expandSidebar();
    }
  },

  sidebarClass: function() {
    if (this.state.sidebar === "show") {
      return "container sidebar";
    } else if (this.state.sidebar === "in") {
      return "container sidebar collapse-in";
    } else if (this.state.sidebar === "out") {
      return "container sidebar collapse-out";
    }
  },

  showSidebarButtons: function() {
    if (this.state.sidebar === "out" || this.state.sidebar === "show") {
      return true;
    }
  },

  createPatientDoctor: function (event) {
    event.preventDefault();
    AuthActions.openPatientDoctorForm();
  },

  addDoctorButton: function() {
    if (!PatientStore.currentPatient().doctor.first_name) {
      return (
        <button
          className={this.buttonClass()}
          onClick={this.createPatientDoctor}>
          <span
            className="glyphicon glyphicon-plus"
            aria-hidden="true"></span> Add Doctor
        </button>
      );
    }
    return;
  },

  sidebarContent: function() {
    if (this.state.sidebar === "out" || this.state.sidebar === "show") {
      return (
        <div className="container sidebar-content">
          <ul className="list-unstyled">
            <li>
              <div className="container width-fix collapse-container">
                <span className="glyphicon glyphicon-remove collapse-icon"
                  onClick={this.collapse}
                  aria-hidden="true"></span>
              </div>
              <div className="sidebar-actions">
                <button
                  className={this.buttonClass()}
                  onClick={this.openForm}>
                  {this.buttonText()}
                </button>
                <button
                  className={this.buttonClass()}
                  onClick={this.createConversation}>
                  <span
                    className="glyphicon glyphicon-envelope"
                    aria-hidden="true"></span> Contact Doctor
                </button>
                {this.addDoctorButton()}
              </div>
              <div className="sidebar-actions">
                <div className="container width-fix">
                  <a className="sidebar-link"
                    target="_blank"
                    href="https://github.com/anup-segu/LogHealthy">GitHub</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      );
    } else {
      return;
    }
  },

  render: function() {
    return (
      <div className={this.sidebarClass()}>
        {this.sidebarContent()}
        <LogForm />
        <PatientDoctorForm />
      </div>
    );
  }

});

module.exports = Sidebar;
