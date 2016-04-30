var AppDispatcher = require('../dispatcher/dispatcher');
var LogApiUtil = require('../util/log_api_util.js');
var LogConstants = require('../constants/log_constants.js');

var LogActions = {
  openForm: function() {
    LogApiUtil.openForm();
  },

  closeForm: function() {
    LogApiUtil.closeForm();
  },

  post: function (log) {
    LogApiUtil.post({
      url: "api/logs",
			log: log,
			success: LogActions.logPosted,
			error: LogActions.handleError
    });
  },

  logPosted: function (patient) {
    LogActions.closeForm();
    AppDispatcher.dispatch({
      actionType: LogConstants.PATIENT_UPDATED,
      patient: patient
    });
  },

  handleError: function (error) {
    AppDispatcher.dispatch({
      actionType: LogConstants.LOG_ERROR,
      errors: error.responseJSON.errors
    });
  }
};

module.exports = LogActions;
