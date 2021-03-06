var React = require('react');

var PatientDoctorForm = require('../../auth/patient_doctor_form.jsx');
var DashboardActions = require('../../../actions/dashboard_actions.js');
var AuthActions = require('../../../actions/auth_actions.js');
var DashboardStore = require('../../../stores/dashboard_store.js');
var DoctorStore = require('../../../stores/doctor_store.js');

var Sidebar = React.createClass({
  getInitialState: function() {
    return ({buttonText: true, sidebar: "show" });
  },

  componentDidMount: function() {
    this.setState({buttonText: true, sidebar: "show" });
    this.dashboardListener = DashboardStore.addListener(this._updateSidebar);
  },

  componentWillUnmount: function() {
    this.dashboardListener.remove();
  },

  _updateSidebar: function() {
    if (DashboardStore.sidebarStatus()) {
      this.setState({ sidebar: "out" });
    } else {
      this.setState({ sidebar: "in" });
    }
  },

  collapse: function (event) {
    event.preventDefault();
    if (this.state.sidebar === "show" || this.state.sidebar === "out") {
      DashboardActions.collapseSidebar();
    } else {
      DashboardActions.expandSidebar();
    }
  },

  createConversation: function (event) {
    event.preventDefault();
    DashboardActions.openTab("conversations", "new");
  },

  createDoctorPatient: function (event) {
    event.preventDefault();
    AuthActions.openPatientDoctorForm();
  },

  contactPatient: function() {
    if (DoctorStore.currentDoctor().patients.length > 0) {
      return (
        <button
          className="btn sidebar-btn"
          onClick={this.createConversation}>
          <span
            className="glyphicon glyphicon-envelope"
            aria-hidden="true"></span> Contact Patient
        </button>
      );
    }
    return;
  },

  addPatient: function() {
    return (
      <button
        className="btn sidebar-btn"
        onClick={this.createDoctorPatient}>
        <span
          className="glyphicon glyphicon-plus"
          aria-hidden="true"></span> Add Patient
      </button>
    );
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

  sidebarContent: function() {
    if (this.state.sidebar === "out" || this.state.sidebar === "show") {
      return (
        <div className="container sidebar-content">
          <ul className="list-unstyled">
            <div className="container width-fix collapse-container">
              <span className="glyphicon glyphicon-remove collapse-icon"
                onClick={this.collapse}
                aria-hidden="true"></span>
            </div>
            <div className="sidebar-actions">
              {this.contactPatient()}
              {this.addPatient()}
            </div>
            <div className="sidebar-actions">
              <div className="container width-fix">
                <a className="sidebar-link"
                  target="_blank"
                  href="https://github.com/anup-segu/LogHealthy">GitHub</a>
              </div>
            </div>
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
        <PatientDoctorForm />
      </div>
    );
  }

});

module.exports = Sidebar;
