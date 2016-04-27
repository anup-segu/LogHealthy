var Store = require('flux/utils').Store;

var AuthConstants = require('../constants/auth_constants.js');
var AppDispatcher = require('../dispatcher/dispatcher.js');

var _modelState = false;
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

AuthStore.formReset = function() {
  _reset = true;
};

AuthStore.modalState = function() {
  var reset = _reset;
  if (reset) {
    return $.extend({ modalOpen: _modelState, form: _form}, blankAttrs);
  }
  _reset = false;
  return { modalOpen: _modelState, form: _form};
};

AuthStore.__onDispatch = function (payload) {
  switch(payload.actionType){
    case AuthConstants.OPEN_SIGN_IN_FORM:
      AuthStore.openSignInModal();
      break;
    case AuthConstants.OPEN_CREATE_FORM:
      AuthStore.openCreateModal();
      break;
    case AuthConstants.CLOSE_FORM:
      AuthStore.closeModal();
      break;
  }
  AuthStore.__emitChange();
};

module.exports = AuthStore;
