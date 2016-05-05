var React = require('react');

var ConversationStore = require('../../../../stores/conversation_store.js');
var ConversationActions = require('../../../../actions/conversation_actions.js');
var DashboardActions = require('../../../../actions/dashboard_actions.js');
var ConversationDetail = require('../../../shared/conversation_detail.jsx');
var NewForm = require('../../../shared/conversation_form.jsx');

var ConversationThread = React.createClass({
  getInitialState: function() {
    return {
      inbox: null,
      outbox: null,
      tab: this.props.tab,
      conversation: {},
      patients: this.props.patients
    };
  },

  componentDidMount: function() {
    this.conversationListener =
      ConversationStore.addListener(this._updateConversations);
    ConversationActions.fetchConversations();
  },

  componentWillUnmount: function() {
    this.conversationListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({ patients: newProps.patients, tab: newProps.tab });
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

  newContent: function() {
    return (
      <NewForm patients={this.state.patients}/>
    );
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

  newTab: function() {
    if (this.state.tab === "new") {
      return "active patient-detail-tab";
    }
    return "patient-detail-tab";
  },

  toggleInbox: function() {
    if (this.state.tab !== "inbox") {
      DashboardActions.openTab("conversations", "inbox");
    }
  },

  toggleOutbox: function() {
    if (this.state.tab !== "outbox") {
      DashboardActions.openTab("conversations", "outbox");
    }
  },

  toggleNew: function() {
    if (this.state.tab !== "new") {
      DashboardActions.openTab("conversations", "new");
    }
  },

  navigation: function() {
    return (
      <nav className="navbar navbar-conversations">
        <div className="navbar-collapse">
         <ul className="nav navbar-nav conversation-tab-list">
           <li className={this.inboxTab()}
             onClick={this.toggleInbox}>
             <a>Inbox</a>
           </li>
           <li className={this.outboxTab()}
             onClick={this.toggleOutbox}>
             <a>Outbox</a>
           </li>
           <li className={this.newTab()}
             onClick={this.toggleNew}>
             <a>Create</a>
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
    } else if (this.state.tab === "new") {
      return this.newContent();
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
