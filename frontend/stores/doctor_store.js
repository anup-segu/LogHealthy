var Store = require('flux/utils').Store;
var AuthConstants = require('../constants/auth_constants.js');
var AppDispatcher = require('../dispatcher/dispatcher.js');

var _currentDoctor, _errors;
var DoctorStore = new Store(AppDispatcher);

DoctorStore.login = function (patient) {
  _currentDoctor = patient;
  _errors = null;
};

DoctorStore.logout = function (patient) {
  _currentDoctor = null;
  _errors = null;
};

DoctorStore.setErrors = function (errors) {
  _errors = errors;
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

DoctorStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case AuthConstants.LOGIN:
      DoctorStore.login(payload.patient);
      break;
    case AuthConstants.LOGOUT:
      DoctorStore.logout();
      break;
    case AuthConstants.ERROR:
      DoctorStore.setErrors(payload.errors);
      break;
  }
  DoctorStore.__emitChange();
};

module.exports = DoctorStore;
