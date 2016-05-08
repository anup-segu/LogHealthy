var React = require("react");
var Modal = require("react-modal");
var Clearfix = require('react-bootstrap/lib/Clearfix');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var AuthStore = require("../../stores/auth_form_store.js");
var PatientStore = require("../../stores/patient_store.js");
var PatientActions = require("../../actions/patient_actions.js");
var DoctorStore = require("../../stores/doctor_store.js");
var DoctorActions = require("../../actions/doctor_actions.js");

var style = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  content: {
    width: '55%',
    height: '100%',
    marginTop: '5%',
    marginLeft: "auto",
    marginRight: "auto",
    minWidth: '500px',
    maxWidth: '550px',
    maxHeight: '500px'
  }
};

var PatientDoctorForm = React.createClass({
  getInitialState: function() {
    return {
      modalOpen: false,
      searchStr: "",
      patients: [],
      doctors: [],
      viewDoctor: null,
      viewPatient: null
    };
  },

  componentDidMount: function() {
    this.doctorListener = DoctorStore.addListener(this._updateDoctors);
    this.patientListener = PatientStore.addListener(this._updatePatients);
    this.authListener = AuthStore.addListener(this._updateModal);

    if (PatientStore.currentPatient()) {
      DoctorActions.fetchAllDoctors();
    } else if (DoctorStore.currentDoctor()) {
      PatientActions.fetchAllPatients();
    }
  },

  _updateDoctors: function() {
    this.setState({
      doctors: DoctorStore.allDoctors(),
      viewPatient: DoctorStore.viewPatient()
    });
  },

  _updatePatients: function() {
    this.setState({
      patients: PatientStore.allPatients(),
      viewDoctor: PatientStore.getDoctor()
    });
  },

  _updateModal: function() {
    this.setState({ modalOpen: AuthStore.getPatientDoctorFormStatus()});
  },

  updateSearch: function (event) {
    event.preventDefault();
    this.setState({ searchStr: event.target.value });
  },

  title: function() {
    if (PatientStore.currentPatient()) {
      return "Connect to Your Doctor";
    } else if (DoctorStore.currentDoctor()) {
      return "Add a New Patient";
    }
  },

  clearForm: function() {
    this.refs.searchBar.value = "";
  },

  viewDoctor: function (eventKey, event) {
    event.preventDefault();
    this.clearForm();
    this.setState({ searchStr: "" });
    PatientActions.viewDoctor(eventKey);
  },

  viewPatient: function (eventKey, event) {
    event.preventDefault();
    this.clearForm();
    this.setState({ searchStr: "" });
    DoctorActions.viewPatient(eventKey);
  },

  createPatientDoctor: function (event) {
    event.preventDefault();
    var data = {
      patient_id: PatientStore.currentPatient().id,
      doctor_id: this.state.viewDoctor.id
    };

    PatientActions.createPatientDoctor(data);
  },

  createDoctorPatient: function (event) {
    event.preventDefault();
    var data = {
      patient_id: this.state.viewPatient.id,
      doctor_id: DoctorStore.currentDoctor().id
    };

    DoctorActions.createDoctorPatient(data);
  },

  form: function() {
    if (PatientStore.currentPatient()) {
      return (
        <div className="input-group patient-search-bar">
          <input
            type="text"
            ref="searchBar"
            className="form-control"
            defaultValue={this.state.searchStr}
            onChange={this.updateSearch}
            placeholder="Find your doctor by name... ex. Doctor Demo"
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
    } else if (DoctorStore.currentDoctor()) {
      return (
        <div className="input-group patient-search-bar">
          <input
            type="text"
            ref="searchBar"
            className="form-control"
            defaultValue={this.state.searchStr}
            onChange={this.updateSearch}
            placeholder="Find your patient by name..."
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
    }
  },

  doctorMatches: function() {
    if (this.state.searchStr.length > 0) {
      var matchedDoctors = [];

      this.state.doctors.forEach( function (doctor) {
        var doctorName = doctor.first_name + " " + doctor.last_name;
        doctorName = doctorName.toLowerCase();
        if (doctorName.indexOf(this.state.searchStr.toLowerCase()) > -1) {
          matchedDoctors.push(doctor);
        }
      }.bind(this));

      if (matchedDoctors.length > 0) {
        var header = <MenuItem header>Matches</MenuItem>;
      } else {
        header = <MenuItem header>No Matches</MenuItem>;
      }

      matchedDoctors = matchedDoctors.map( function(doctor) {
        return (
          <MenuItem
            key={doctor.id}
            onSelect={this.viewDoctor}
            eventKey={doctor.id}>
            {doctor.first_name + " " + doctor.last_name}</MenuItem>
        );
      }.bind(this));

      return (
        <ul className="dropdown-menu patient-hits patient-doctor-hits">
         {header}
         {matchedDoctors}
        </ul>
      );
    }
    return;
  },

  patientMatches: function() {
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
      <ul className="dropdown-menu patient-hits patient-doctor-hits">
       {header}
       {matchedPatients}
      </ul>
    );
  },

  matches: function() {
    if (this.state.searchStr.length > 0 && PatientStore.currentPatient()) {
      return this.doctorMatches();
    } else if (this.state.searchStr.length > 0 && DoctorStore.currentDoctor()) {
      return this.patientMatches();
    }
    return;
  },

  selection: function() {
    if (this.state.viewDoctor) {
      return (
        <div className="width-fix connect-dialog">
          <h4>Are you sure you want to connect to this Doctor?</h4>
          <p>{"Dr. "+this.state.viewDoctor.first_name+" "+this.state.viewDoctor.last_name}</p>
          <button className="btn btn-login" onClick={this.createPatientDoctor}>Connect</button>
        </div>
      );
    } else if (this.state.viewPatient) {
      return (
        <div className="width-fix connect-dialog">
          <h4>Are you sure you want to connect to this Patient?</h4>
          <p>{this.state.viewPatient.first_name+" "+this.state.viewPatient.last_name}</p>
          <button className="btn btn-login" onClick={this.createDoctorPatient}>Connect</button>
        </div>
      );
    }
    return;
  },

  closeModal: function() {
    this.setState({ modalOpen: false });
  },

  render: function() {
    return (
      <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.closeModal}
        style={style}>
        <div id="login-form" className="container splash-form">
          <h3 className="form-title">{this.title()}</h3>
          {this.form()}
          {this.matches()}
          {this.selection()}
        </div>
      </Modal>
    );
  }

});

module.exports = PatientDoctorForm;
