var Store = require('flux/utils').Store;

var AuthConstants = require('../constants/auth_constants.js');
var AppDispatcher = require('../dispatcher/dispatcher.js');

var _modelState = false;
var _form = "signup";
var AuthStore = new Store(AppDispatcher);

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

AuthStore.modalState = function() {
  return { modalOpen: _modelState, form: _form };
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
