var AppDispatcher = require('../dispatcher/dispatcher');
var LogConstants = require('../constants/log_constants.js');


module.exports = {
  openForm: function() {
    AppDispatcher.dispatch({
      actionType: LogConstants.OPEN_LOG_FORM
    });
  }
};
