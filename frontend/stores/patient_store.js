var Store = require('flux/utils').Store;
var AuthConstants = require('../constants/auth_constants.js');
var AppDispatcher = require('../dispatcher/dispatcher.js');

var _currentPatient, _errors;
var PatientStore = new Store(AppDispatcher);

PatientStore.login = function (patient) {
  _currentPatient = patient;
  _errors = null;
};

PatientStore.logout = function (patient) {
  _currentPatient = null;
  _errors = null;
};

PatientStore.setErrors = function (errors) {
  _errors = errors;
};

PatientStore.currentPatient = function() {
  if (_currentPatient) {
    return $.extend({}, _currentPatient);
  }
};

PatientStore.errors = function() {
  if (_errors) {
    return [].slice.call(_errors);
  }
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
  }
  PatientStore.__emitChange();
};

module.exports = PatientStore;
