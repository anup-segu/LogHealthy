var Store = require('flux/utils').Store;
var AuthConstants = require('../constants/auth_constants.js');
var DoctorConstants = require('../constants/doctor_constants.js');
var AppDispatcher = require('../dispatcher/dispatcher.js');

var _currentDoctor, _errors, _viewPatient;
var DoctorStore = new Store(AppDispatcher);

DoctorStore.login = function (doctor) {
  if (doctor && doctor.ttype === "doctor") {
    _currentDoctor = doctor;
    _errors = null;
  }
};

DoctorStore.logout = function (doctor) {
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
  if (_currentDoctor) {
    return $.extend({}, _currentDoctor);
  }
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
  return $.extend({}, _viewPatient);
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
    case DoctorConstants.VIEW_PATIENT:
      DoctorStore.loadPatient(payload.patient);
      break;
  }
  DoctorStore.__emitChange();
};

module.exports = DoctorStore;
