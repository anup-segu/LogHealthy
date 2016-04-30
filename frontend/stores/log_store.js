var Store = require('flux/utils').Store;

var LogConstants = require('../constants/log_constants.js');
var AppDispatcher = require('../dispatcher/dispatcher.js');

var _modalState = false;
var _errors;

var LogStore = new Store(AppDispatcher);

LogStore.openLogForm = function() {
  _modalState = true;
};

LogStore.closeLogForm = function() {
  _modalState = false;
};

LogStore.setErrors = function (errors) {
  _errors = errors;
},

LogStore.errors = function() {
  var errors  = $.extend({}, _errors);
  _errors = null;
  return errors;
},

LogStore.modalState = function() {
  var state = _modalState;
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
  }
  LogStore.__emitChange();
};


module.exports = LogStore;
