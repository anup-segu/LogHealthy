var React = require('react');
var Fade = require('react-bootstrap/lib/Fade');

var LogDetail = require('./logs_detail.jsx');
var GlucoseChart = require('../../../patients/dashboard/progress/glucose_chart.jsx');

var PatientDetail = React.createClass({
  getInitialState: function() {
    return { patient: this.props.patient, tab: "progress" };
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({ patient: newProps.patient });
  },

  progressTab: function() {
    if (this.state.tab === "progress") {
      return "active patient-detail-tab";
    }
    return "patient-detail-tab";
  },

  toggleProgress: function() {
    if (this.state.tab !== "progress") {
      this.setState( {tab: "progress" } );
    }
  },

  logsTab: function() {
    if (this.state.tab === "logs") {
      return "active patient-detail-tab";
    }
    return "patient-detail-tab";
  },

  toggleLogs: function() {
    if (this.state.tab !== "logs") {
      this.setState( {tab: "logs" } );
    }
  },

  patientHeading: function () {
    return (
      <nav className="navbar navbar-default patients-navbar">
        <div className="navbar-header">
          <a className="navbar-brand">
            {this.state.patient.first_name + " " +
              this.state.patient.last_name}
          </a>
        </div>
        <div className="navbar-collapse">
         <ul className="nav navbar-nav">
           <li className={this.progressTab()}
             onClick={this.toggleProgress}>
             <a>Progress</a>
           </li>
           <li className={this.logsTab()}
             onClick={this.toggleLogs}>
             <a>Logs</a>
           </li>
         </ul>
       </div>
      </nav>
    );
  },

  logsContent: function() {
    if (Object.keys(this.state.patient.logs).length > 0) {

      var logData = this.state.patient.logs;

      var elements = Object.keys(logData).map(function (date) {
        var index = Object.keys(logData).indexOf(date);

        return(
          <LogDetail
            key={date}
            date={date}
            log={logData[date]}
            index = {index} />
        );
      });

      return (
        <div className="container width-fix">
          <div className="container logs-list">
            {elements}
          </div>
        </div>
      );
    } else {
      return (
        <div className="well well-lg width-fix no-content">
          There doesn't seem to be anything here..
        </div>
      );
    }
  },

  progressContent: function() {
    if (Object.keys(this.state.patient.logs).length > 0) {
      return (
        <div className="chart-container">
          <GlucoseChart glucose={this.state.patient.logs} />
        </div>
      );
    } else {
      return (
        <div className="well well-lg width-fix no-content">
          There doesn't seem to be anything here..
        </div>        
      );
    }
  },

  patientContent: function() {
    if (this.state.tab === "logs") {
      return (
        this.logsContent()
      );
    } else if (this.state.tab === "progress") {
      return (
        this.progressContent()
      );
    }
  },

  render: function() {
    return (
      <div className="container patient-detail-container">
        {this.patientHeading()}
        {this.patientContent()}
      </div>
    );
  }

});

module.exports = PatientDetail;
