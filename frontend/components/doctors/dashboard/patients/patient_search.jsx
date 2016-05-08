var React = require('react');
var Clearfix = require('react-bootstrap/lib/Clearfix');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var DoctorStore = require('../../../../stores/doctor_store.js');
var DoctorActions = require('../../../../actions/doctor_actions.js');
var AuthActions = require('../../../../actions/auth_actions.js');

var PatientSearch = React.createClass({
  getInitialState: function() {
    return ({
      patients: this.props.patients,
      searchStr: ""
    });
  },

  componentWillReceiveProps: function (newprops) {
    this.setState({ patients: newprops.patients });
  },

  updateSearch: function (event) {
    event.preventDefault();
    this.setState({ searchStr: event.target.value });
  },

  viewPatient: function (eventKey) {
    this.clearForm();
    this.setState({ searchStr: "" });
    AuthActions.closePatientDoctorForm();
    DoctorActions.viewPatient(eventKey);
  },

  clearForm: function() {
    this.refs.searchBar.value = "";
  },

  matches: function() {
    if (this.state.searchStr.length > 0) {
      var matchedPatients = [];

      this.state.patients.forEach( function (patient) {
        var patientName = patient.first_name + " " + patient.last_name;
        patientName = patientName.toLowerCase();
        if (patientName.indexOf(this.state.searchStr.toLowerCase()) > -1) {
          matchedPatients.push(patient);
        }
      }.bind(this));

      if (matchedPatients.length > 0) {
        var header = <MenuItem header>Matches</MenuItem>;
      } else {
        header = <MenuItem header>No Matches</MenuItem>;
      }

      matchedPatients = matchedPatients.map( function(patient) {
        return (
          <MenuItem
            key={patient.id}
            onSelect={this.viewPatient}
            eventKey={patient.id}>
            {patient.first_name + " " + patient.last_name}</MenuItem>
        );
      }.bind(this));

      return (
        <ul className="dropdown-menu patient-hits">
         {header}
         {matchedPatients}
       </ul>
      );
    }
    return;
  },

  searchField: function() {
    return (
      <div className="input-group patient-search-bar">
        <input
          type="text"
          ref="searchBar"
          className="form-control"
          defaultValue={this.state.searchStr}
          onChange={this.updateSearch}
          placeholder="Search your patients by name... ex. Patient Demo"
          aria-describedby="basic-addon2" />
        <span
          className="input-group-addon"
          id="basic-addon2">
          <span
            className="glyphicon glyphicon-search"
            aria-hidden="true"></span>
        </span>
      </div>
    );
  },

  render: function() {
    return (
      <div className="search-section">
        {this.searchField()}
        {this.matches()}
      </div>
    );
  }

});

module.exports = PatientSearch;
