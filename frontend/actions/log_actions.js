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

  openEditForm: function (log) {
    LogApiUtil.openEditForm(log);
  },

  closeEditForm: function() {
    LogApiUtil.closeEditForm();
  },

  post: function (log) {
    LogApiUtil.post({
      url: "api/logs",
			log: log,
			success: LogActions.logPosted,
			error: LogActions.handleError
    });
  },

  patch: function (log) {
    LogApiUtil.patch({
      url: "api/logs/" + log.id,
      log: log,
      success: LogActions.logPosted,
      error: LogActions.handleEditError
    });
  },

  delete: function (id) {
    LogApiUtil.delete({
      url: "api/logs/" + id,
      success: LogActions.logRemoved
    });
  },

  logPosted: function (patient) {
    // LogActions.closeForm();
    AppDispatcher.dispatch({
      actionType: LogConstants.PATIENT_UPDATED,
      patient: patient
    });
  },

  logRemoved: function (patient) {
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
  },

  handleEditError: function (error) {
    AppDispatcher.dispatch({
      actionType: LogConstants.LOG_EDIT_ERROR,
      errors: error.responseJSON.errors
    });
  }
};

module.exports = LogActions;
