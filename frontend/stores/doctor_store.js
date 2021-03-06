var Store = require('flux/utils').Store;
var AuthConstants = require('../constants/auth_constants.js');
var DoctorConstants = require('../constants/doctor_constants.js');
var AppDispatcher = require('../dispatcher/dispatcher.js');

var _currentDoctor, _errors, _viewPatient, _doctors=[];
var DoctorStore = new Store(AppDispatcher);

DoctorStore.login = function (doctor) {
  if (doctor && doctor.ttype === "doctor") {
    localStorage.setItem("currentDoctor", JSON.stringify(doctor));

    _currentDoctor = doctor;
    _errors = null;
  }
};

DoctorStore.updateDoctor = function (doctor) {
  _currentDoctor = doctor;
  localStorage.setItem("currentDoctor", JSON.stringify(doctor));
  _errors = null;
};

DoctorStore.logout = function (doctor) {
  localStorage.removeItem("currentPatient");
  localStorage.removeItem("currentDoctor");

  _currentDoctor = null;
  _errors = null;
  _viewPatient = null;
};

DoctorStore.setErrors = function (errors) {
  _errors = errors;
};

DoctorStore.resetErrors = function() {
  _errors = null;
};

DoctorStore.currentDoctor = function() {
  var doctor = JSON.parse(localStorage.getItem("currentDoctor"));

  if (_currentDoctor) {
    return $.extend({}, _currentDoctor);
  } else if (doctor) {
    return $.extend({}, doctor);
  }
};

DoctorStore.currentDoctorHasPatient = function (patient) {
  if (_currentDoctor) {
    var patientIds = _currentDoctor.patients.map(function (currentPatient) {
      return currentPatient.id;
    });

    if (patientIds.indexOf(patient.id) > -1) {
      return true;
    } else {
      return false;
    }
  }
  return;
};

DoctorStore.errors = function() {
  if (_errors) {
    return [].slice.call(_errors);
  }
};

DoctorStore.loadPatient = function (patient) {
  _viewPatient = patient;
};

DoctorStore.viewPatient = function () {
  if (_viewPatient) {
    return $.extend({}, _viewPatient);
  }
  return;
};

DoctorStore.loadDoctors = function (doctors) {
  _viewPatient = null;
  _doctors = doctors;
};

DoctorStore.allDoctors = function() {
  return _doctors;
};

DoctorStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case AuthConstants.LOGIN:
      DoctorStore.login(payload.doctor);
      break;
    case AuthConstants.LOGOUT:
      DoctorStore.logout();
      break;
    case AuthConstants.ERROR:
      DoctorStore.setErrors(payload.errors);
      break;
    case AuthConstants.CLOSE_FORM:
      DoctorStore.resetErrors();
      break;
    case AuthConstants.OPEN_SIGN_IN_FORM:
      DoctorStore.resetErrors();
      break;
    case AuthConstants.OPEN_CREATE_FORM:
      DoctorStore.resetErrors();
      break;
    case DoctorConstants.VIEW_PATIENT:
      DoctorStore.loadPatient(payload.patient);
      break;
    case DoctorConstants.DOCTORS_RECEIVED:
      DoctorStore.loadDoctors(payload.doctors);
      break;
    case DoctorConstants.DOCTOR_UPDATED:
      DoctorStore.updateDoctor(payload.doctor);
      break;
  }
  DoctorStore.__emitChange();
};

module.exports = DoctorStore;
