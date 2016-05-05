var AppDispatcher = require('../dispatcher/dispatcher');
var ConversationApiUtil = require('../util/conversation_api_util.js');
var ConversationConstants = require('../constants/conversation_constants.js');

var ConversationActions = {
  fetchConversations: function (id, ttype) {
    ConversationApiUtil.fetchConversations({
      data: { id: id, ttype: ttype },
      success: function (conversations) {
        AppDispatcher.dispatch({
          actionType: ConversationConstants.THREADS_RECEIVED,
          conversations: conversations
        });
      }
    });
  },

  createConversation: function (conversation) {
    ConversationApiUtil.createConversation({
      url: 'api/conversations',
      conversation: conversation,
      success: function (conversations) {
        AppDispatcher.dispatch({
          actionType: ConversationConstants.THREADS_RECEIVED,
          conversations: conversations
        });
      },
      error: ConversationActions.handleError
    });
  },

  handleError: function (error) {
    if (error.responseJSON) {
			AppDispatcher.dispatch({
				actionType: ConversationConstants.CONVERSATION_ERROR,
				errors: error.responseJSON.errors
			});
		}
  },

  openNewConversation: function() {
    AppDispatcher.dispatch({
      actionType: ConversationConstants.OPEN_NEW_CONVERSATION
    });
  }
};

module.exports = ConversationActions;
