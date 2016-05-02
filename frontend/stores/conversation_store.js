var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var ConversationConstants = require('../constants/conversation_constants.js');

var _inbox, _outbox;
var ConversationStore = new Store(AppDispatcher);

ConversationStore.updateConversations = function (conversations) {
  _inbox = conversations.inbox;
  _outbox = conversations.outbox;
};

ConversationStore.inbox = function() {
  return [].slice.call(_inbox);
};

ConversationStore.outbox = function() {
  return [].slice.call(_outbox);
};

ConversationStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case ConversationConstants.THREADS_RECEIVED:
      ConversationStore.updateConversations(payload.conversations);
      break;
  }
  ConversationStore.__emitChange();
};

module.exports = ConversationStore;
