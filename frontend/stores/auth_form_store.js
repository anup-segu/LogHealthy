var Store = require('flux/utils').Store;

var AuthConstants = require('../constants/auth_constants.js');
var AppDispatcher = require('../dispatcher/dispatcher.js');

var _modelState = false;
var _patientDoctorForm = null;
var _form = "signup";
var _reset = "false";
var AuthStore = new Store(AppDispatcher);

var blankAttrs = {
  email: "",
  password: "",
  first_name: "",
  last_name: ""
};

AuthStore.openCreateModal = function() {
  _modelState = true;
  _form = "signup";
};

AuthStore.openSignInModal = function() {
  _modelState = true;
  _form = "login";
};

AuthStore.closeModal = function() {
  _modelState = false;
};

AuthStore.getForm = function() {
  var form = _form;
  return form;
};

AuthStore.setForm = function (form) {
  _form = form;
};

AuthStore.formReset = function (reset) {
  _reset = reset;
};

AuthStore.modalState = function() {
  var reset = _reset;
  if (reset) {
    return $.extend({ modalOpen: _modelState, form: _form}, blankAttrs);
  }
  _reset = false;
  return { modalOpen: _modelState, form: _form};
};


AuthStore.openPatientDoctorForm = function() {
  _patientDoctorForm = true;
};

AuthStore.closePatientDoctorForm = function() {
  _patientDoctorForm = false;
};

AuthStore.getPatientDoctorFormStatus = function() {
  var status = _patientDoctorForm;
  return status;
};

AuthStore.__onDispatch = function (payload) {
  switch(payload.actionType){
    case AuthConstants.OPEN_SIGN_IN_FORM:
      AuthStore.setForm("login");
      AuthStore.formReset(true);
      AuthStore.openSignInModal();
      break;
    case AuthConstants.OPEN_CREATE_FORM:
      AuthStore.setForm("signup");
      AuthStore.formReset(true);
      AuthStore.openCreateModal();
      break;
    case AuthConstants.CLOSE_FORM:
      AuthStore.closeModal();
      break;
    case AuthConstants.ERROR:
      AuthStore.setForm(payload.form);
      AuthStore.formReset(false);
      break;
    case AuthConstants.OPEN_PATIENT_DOCTOR:
      AuthStore.openPatientDoctorForm();
      break;
    case AuthConstants.CLOSE_PATIENT_DOCTOR:
      AuthStore.closePatientDoctorForm();
      break;
  }
  AuthStore.__emitChange();
};

module.exports = AuthStore;
