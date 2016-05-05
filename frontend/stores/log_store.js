var Store = require('flux/utils').Store;

var LogConstants = require('../constants/log_constants.js');
var AppDispatcher = require('../dispatcher/dispatcher.js');

var _modalState = false;
var _modalEditState = {};
var _errors;
var _editErrors;

var LogStore = new Store(AppDispatcher);

LogStore.openLogForm = function() {
  _modalState = true;
};

LogStore.closeLogForm = function() {
  _modalState = false;
};

LogStore.openEditForm = function(log) {
  _modalEditState[log.id] = true;
};

LogStore.closeEditForm = function() {
  _modalEditState = {};
  _errors = null;
};

LogStore.setErrors = function (errors) {
  _errors = errors;
};

LogStore.setEditErrors = function (errors) {
  _editErrors = errors;
};

LogStore.errors = function() {
  if (_errors) {
    var errors  = [].slice.call(_errors);
    _errors = null;
    return errors;
  }
  return;
};

LogStore.editErrors = function() {
  if (_editErrors) {
    var errors  = [].slice.call(_editErrors);
    _editErrors = null;
    return errors;
  }
  return;
};

LogStore.modalState = function() {
  var state = _modalState;
  return state;
};

LogStore.modalEditState = function (id) {
  var state = _modalEditState[id];
  return state;
};

LogStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case LogConstants.OPEN_LOG_FORM:
      LogStore.openLogForm();
      break;
    case LogConstants.CLOSE_LOG_FORM:
      LogStore.closeLogForm();
      break;
    case LogConstants.LOG_ERROR:
      LogStore.setErrors(payload.errors);
      break;
    case LogConstants.LOG_EDIT_ERROR:
      LogStore.setEditErrors(payload.errors);
      break;
    case LogConstants.OPEN_EDIT_FORM:
      LogStore.openEditForm(payload.log);
      break;
    case LogConstants.CLOSE_EDIT_FORM:
      LogStore.closeEditForm();
      break;
    case LogConstants.PATIENT_UPDATED:
      LogStore.closeEditForm();
      break;
  }
  LogStore.__emitChange();
};


module.exports = LogStore;
