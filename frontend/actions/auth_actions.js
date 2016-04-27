var AppDispatcher = require('../dispatcher/dispatcher');
var AuthConstants = require('../constants/auth_constants');

module.exports = {
  openForm: function() {
    AppDispatcher.dispatch({
      actionType: AuthConstants.OPEN_FORM,
      modalOpen: true
    });
  },

  closeForm: function() {
    AppDispatcher.dispatch({
      actionType: AuthConstants.CLOSE_FORM,
      modalOpen: false
    });
  }
};
