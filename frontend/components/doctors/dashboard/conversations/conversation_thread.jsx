var React = require('react');

var ConversationStore = require('../../../../stores/conversation_store.js');
var ConversationActions = require('../../../../actions/conversation_actions.js');
var ConversationDetail = require('../../../shared/conversation_detail.jsx');

var ConversationThread = React.createClass({
  getInitialState: function() {
    return { inbox: null, outbox: null };
  },

  componentDidMount: function() {
    this.conversationListener =
      ConversationStore.addListener(this._updateConversations);
    ConversationActions.fetchConversations();
  },

  componentWillUnmount: function() {
    this.conversationListener.remove();
  },

  _updateConversations: function() {
    this.setState({
      inbox: ConversationStore.inbox(),
      outbox: ConversationStore.outbox()
    });
  },

  inboxContent: function() {
    if (this.state.inbox) {
      var threads = this.state.inbox.map( function (conversation){
        console.log(conversation);
        return (
          <li key={conversation.id}
            className="conversation-thread">
            <ConversationDetail
              conversation={conversation}
              type="inbound" />
          </li>
        );
      });
      return (
        <ul className="conversation-list" key="inbox">
          {threads}
        </ul>
      );
    }
    return;
  },

  outboxContent: function() {
    if (this.state.outbox) {
      var threads = this.state.outbox.map( function (conversation){
        return (
          <li key={conversation.id}
            className="conversation-thread">
            <ConversationDetail
              conversation={conversation}
              type="outbound"
              response={false} />
          </li>
        );
      });
      return (
        <ul className="conversation-list" key="outbox">
          {threads}
        </ul>
      );
    }
    return;
  },

  render: function() {
    return (
      <div className="container thread-container">
        {this.inboxContent()}
        {this.outboxContent()}
      </div>
    );
  }

});

module.exports = ConversationThread;
