var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var ConversationConstants = require('../constants/conversation_constants.js');

var _inbox, _outbox, _status, _errors;
var ConversationStore = new Store(AppDispatcher);

ConversationStore.updateConversations = function (conversations) {
  _inbox = conversations.inbox;
  _outbox = conversations.outbox;
  _errors = null;
  _status = true;
};

ConversationStore.updateStatus = function() {
  var status = _status;
  _status = null;
  return status;
};

ConversationStore.updateErrors = function(errors) {
  _errors = errors;
};

ConversationStore.errors = function() {
  if (_errors) {
    return [].slice.call(_errors);
  }
  return;
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
    case ConversationConstants.CONVERSATION_ERROR:
      ConversationStore.updateErrors(payload.errors);
      break;
  }
  ConversationStore.__emitChange();
};

module.exports = ConversationStore;
