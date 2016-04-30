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

  post: function (options) {
    $.ajax({
			url: options.url,
			type: "post",
			data: {log: options.log},
			success: options.success,
			error: options.error
		});
  },
};
