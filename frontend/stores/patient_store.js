var Store = require('flux/utils').Store;
var AuthConstants = require('../constants/auth_constants.js');
var PatientConstants = require('../constants/patient_constants.js');
var LogConstants = require('../constants/log_constants.js');
var AppDispatcher = require('../dispatcher/dispatcher.js');

var _currentPatient, _errors, _patientDoctorForm, _patients=[], _doctor;
var PatientStore = new Store(AppDispatcher);
var appStorage = localStorage;

PatientStore.login = function (patient) {
  if (patient && patient.ttype === "patient") {
    localStorage.setItem("currentPatient", JSON.stringify(patient));
    _currentPatient = patient;
    _errors = null;
  }
};

PatientStore.logout = function (patient) {
  localStorage.removeItem("currentPatient");
  localStorage.removeItem("currentDoctor");

  _currentPatient = null;
  _errors = null;
};

PatientStore.updatePatient = function (patient) {
  _currentPatient = patient;
  localStorage.setItem("currentPatient", JSON.stringify(patient));
  _errors = null;
};

PatientStore.setErrors = function (errors) {
  _errors = errors;
};

PatientStore.resetErrors = function() {
  _errors = null;
};

PatientStore.currentPatient = function() {
  var patient = JSON.parse(localStorage.getItem("currentPatient"));

  if (_currentPatient) {
    return $.extend({}, _currentPatient);
  } else if (patient) {
    return $.extend({}, patient);
  }
};

PatientStore.loadDoctor = function (doctor) {
  _doctor = doctor;
};

PatientStore.getDoctor = function() {
  if (_doctor) {
    var doctor = _doctor;
    return $.extend({}, doctor);
  }
  return;
};

PatientStore.errors = function() {
  if (_errors) {
    return [].slice.call(_errors);
  }
};

PatientStore.loadPatients = function (patients) {
  _doctor = null;
  _patients = patients;
};

PatientStore.allPatients = function() {
  return [].slice.call(_patients);
};

PatientStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case AuthConstants.LOGIN:
      PatientStore.login(payload.patient);
      break;
    case AuthConstants.LOGOUT:
      PatientStore.logout();
      break;
    case AuthConstants.ERROR:
      PatientStore.setErrors(payload.errors);
      break;
    case AuthConstants.CLOSE_FORM:
      PatientStore.resetErrors();
      break;
    case AuthConstants.OPEN_SIGN_IN_FORM:
      PatientStore.resetErrors();
      break;
    case AuthConstants.OPEN_CREATE_FORM:
      PatientStore.resetErrors();
      break;
    case LogConstants.PATIENT_UPDATED:
      PatientStore.updatePatient(payload.patient);
      break;
    case PatientConstants.PATIENTS_RECEIVED:
      PatientStore.loadPatients(payload.patients);
      break;
    case PatientConstants.VIEW_DOCTOR:
      PatientStore.loadDoctor(payload.doctor);
      break;
  }
  PatientStore.__emitChange();
};

module.exports = PatientStore;
