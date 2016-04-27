var Store = require('flux/utils').Store;

var AuthConstants = require('../constants/auth_constants.js');
var AppDispatcher = require('../dispatcher/dispatcher.js');

var _modelState = false;
var AuthStore = new Store(AppDispatcher);

AuthStore.openModal = function() {
  _modelState = true;
};

AuthStore.closeModal = function() {
  _modelState = false;
};

AuthStore.modalState = function() {
  return _modelState;
};

AuthStore.__onDispatch = function (payload) {
  switch(payload.actionType){
    case AuthConstants.OPEN_FORM:
      AuthStore.openModal();
      break;
    case AuthConstants.CLOSE_FORM:
      AuthStore.closeModal();
      break;
  }
  AuthStore.__emitChange();
};

module.exports = AuthStore;
