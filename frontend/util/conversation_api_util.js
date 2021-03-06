var AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
  fetchConversations: function (options) {
    $.ajax({
      url: 'api/conversations',
      data: options.data,
      success: options.success
    });
  },

  createConversation: function (options) {
    $.ajax({
      url: options.url,
      data: { conversation: options.conversation },
      type: 'post',
      success: options.success,
      error: options.error
    });
  }
};
