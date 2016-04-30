var AppDispatcher = require('../dispatcher/dispatcher');
var LogApiUtil = require('../util/log_api_util.js');
var LogConstants = require('../constants/log_constants.js');

var LogActions = {
  openForm: function() {
    LogApiUtil.openForm();
  },

  post: function (log) {
    LogApiUtil.post({
      url: "api/logs",
			log: log,
			success: LogActions.receiveNewLog,
			error: LogActions.handleError
    });
  },

  receiveNewLog: function (log) {
    console.log(log);
  },

  handleError: function (error) {
    debugger;
    AppDispatcher.dispatch({
      actionType: LogConstants.ERROR,
      errors: error.responseJSON.errors
    });
  }
};

module.exports = LogActions;
