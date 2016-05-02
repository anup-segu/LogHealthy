var AppDispatcher = require('../dispatcher/dispatcher');
var ConversationApiUtil = require('../util/conversation_api_util.js');
var ConversationConstants = require('../constants/conversation_constants.js');

var ConversationActions = {
  fetchConversations: function() {
    ConversationApiUtil.fetchConversations({
      success: function (conversations) {
        AppDispatcher.dispatch({
          actionType: ConversationConstants.THREADS_RECEIVED,
          conversations: conversations
        });
      }
    });
  }
};

module.exports = ConversationActions;
