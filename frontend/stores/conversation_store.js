var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var ConversationConstants = require('../constants/conversation_constants.js');

var _inbox, _outbox, _status, _errors, _conversationTabOpen;
var ConversationStore = new Store(AppDispatcher);

ConversationStore.updateConversations = function (conversations) {
  _inbox = conversations.inbox;
  _outbox = conversations.outbox;
  _errors = null;
  _status = null;
};

ConversationStore.updateStatus = function (status) {
  _status = status;
};

ConversationStore.updateErrors = function (errors) {
  _errors = errors;
};

ConversationStore.status = function() {
  var status = _status;
  _status = null;
  return status;
};

ConversationStore.errors = function() {
  if (_errors) {
    var errors = _errors;
    _errors = null;
    return [].slice.call(errors);
  }
  return;
};

ConversationStore.updateConversationTab = function() {
  if (!_conversationTabOpen) {
    _conversationTabOpen = true;
  }
};

ConversationStore.conversationTabStatus = function() {
  var tabOpen = _conversationTabOpen;
  _conversationTabOpen = null;
  return tabOpen;
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
    case ConversationConstants.THREAD_SUBMITTED:
      ConversationStore.updateConversations(payload.conversations);
      ConversationStore.updateStatus(true);
      break;
    case ConversationConstants.CONVERSATION_ERROR:
      ConversationStore.updateErrors(payload.errors);
      ConversationStore.updateStatus(false);
      break;
    case ConversationConstants.OPEN_NEW_CONVERSATION:
      ConversationStore.updateConversationTab();
      break;
  }
  ConversationStore.__emitChange();
};

module.exports = ConversationStore;
