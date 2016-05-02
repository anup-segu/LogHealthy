var React = require('react');

var ConversationStore = require('../../../../stores/conversation_store.js');
var ConversationActions = require('../../../../actions/conversation_actions.js');
var ConversationDetail = require('../../../shared/conversation_detail.jsx');

var ConversationThread = React.createClass({
  getInitialState: function() {
    return { inbox: null, outbox: null, tab: "inbox" };
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

  inboxTab: function() {
    if (this.state.tab === "inbox") {
      return "active patient-detail-tab";
    }
    return "patient-detail-tab";
  },

  outboxTab: function() {
    if (this.state.tab === "outbox") {
      return "active patient-detail-tab";
    }
    return "patient-detail-tab";
  },

  toggleInbox: function() {
    if (this.state.tab !== "inbox") {
      this.setState({ tab: "inbox" });
    }
  },

  toggleOutbox: function() {
    if (this.state.tab !== "outbox") {
      this.setState({ tab: "outbox" });
    }
  },

  navigation: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-collapse">
         <ul className="nav navbar-nav">
           <li className={this.inboxTab()}
             onClick={this.toggleInbox}>
             <a>Inbox</a>
           </li>
           <li className={this.outboxTab()}
             onClick={this.toggleOutbox}>
             <a>Outbox</a>
           </li>
         </ul>
       </div>
      </nav>
    );
  },

  boxContent: function() {
    if (this.state.tab === "inbox") {
      return this.inboxContent();
    } else if (this.state.tab === "outbox") {
      return this.outboxContent();
    }
  },

  render: function() {
    return (
      <div className="container thread-container">
        {this.navigation()}
        {this.boxContent()}
      </div>
    );
  }

});

module.exports = ConversationThread;
