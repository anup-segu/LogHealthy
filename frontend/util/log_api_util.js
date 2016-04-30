var AppDispatcher = require('../dispatcher/dispatcher');
var LogConstants = require('../constants/log_constants.js');


module.exports = {
  openForm: function() {
    AppDispatcher.dispatch({
      actionType: LogConstants.OPEN_LOG_FORM
    });
  },

  closeForm: function() {
    AppDispatcher.dispatch({
      actionType: LogConstants.CLOSE_LOG_FORM
    });
  },

  openEditForm: function (log) {
    AppDispatcher.dispatch({
      actionType: LogConstants.OPEN_EDIT_FORM,
      log: log
    });
  },

  closeEditForm: function() {
    AppDispatcher.dispatch({
      actionType: LogConstants.CLOSE_EDIT_FORM
    });
  },

  post: function (options) {
    $.ajax({
			url: options.url,
			type: "post",
			data: {log: options.log},
			success: options.success,
			error: options.error
		});
  },

  patch: function (options) {
    $.ajax({
      url: options.url,
      type: "patch",
      data: {log: options.log},
      success: options.success,
      error: options.error
    });
  },
};
