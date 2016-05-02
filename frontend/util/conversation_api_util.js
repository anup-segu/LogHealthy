var AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
  fetchConversations: function (options) {
    $.ajax({
      url: 'api/conversations',
      success: options.success
    });
  }
};
