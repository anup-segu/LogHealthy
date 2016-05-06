var React = require("react");
var Modal = require("react-modal");

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
    return { modalOpen: false, searchStr: "" };
  },

  componentDidMount: function() {
    this.doctorListener = DoctorStore.addListener(this._updateDoctors);
    this.patientListener = PatientStore.addListener(this._updatePatients);

    if (PatientStore.currentPatient()) {
      DoctorActions.fetchDoctors();
    } else if (DoctorStore.currentDoctor()) {
      PatientActions.fetchPatients();
    }
  },

  title: function() {
    if (PatientStore.currentPatient()) {
      return "Connect to Your Doctor";
    } else if (DoctorStore.currentDoctor()) {
      return "Add a New Patient";
    }
  },

  form: function() {
    if (PatientStore.currentPatient()) {
      return (

      );
    } else if (DoctorStore.currentDoctor()) {
      return (

      );
    }
  },


  render: function() {
    return (
      <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.closeModal}
        style={style}>
        <div id="login-form" className="container splash-form">
          <h3>{this.title()}</h3>
          {this.form()}
        </div>
      </Modal>
    );
  }

});

module.exports = PatientDoctorForm;
