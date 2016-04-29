var Store = require('flux/utils').Store;

var LogConstants = require('../constants/log_constants.js');
var AppDispatcher = require('../dispatcher/dispatcher.js');

var _modalState = false;

var LogStore = new Store(AppDispatcher);

LogStore.openLogForm = function() {
  _modalState = true;
},

LogStore.modalState = function() {
  var state = _modalState;
  return state;
},

LogStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case LogConstants.OPEN_LOG_FORM:
      LogStore.openLogForm();
      break;
  }
  LogStore.__emitChange();
};


module.exports = LogStore;
