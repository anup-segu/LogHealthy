var React = require('react');
var PropTypes = React.PropTypes;

var ConversationDetail = React.createClass({
  getInitialState: function() {
    return {
      conversation: this.props.conversation,
      type: this.props.type,
      detail: false
    };
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({ conversation: newProps.conversation });
  },

  oppositeType: function() {
    if (this.state.type === "inbound") {
      return "outbound";
    } else if (this.state.type === "outbound") {
      return "inbound";
    }
  },

  location: function() {
    if (this.state.type === "inbound") {
      return (
        <h5 className="location-tag">
          {"From: " + this.state.conversation.author}
        </h5>
      );
    } else if (this.state.type === "outbound") {
      return (
        <h5 className="location-tag">
          {"To: " + this.state.conversation.recipient}
        </h5>
      );
    }
  },

  time: function() {
    var date = new Date(this.state.conversation.created_at);
    return (
      <h5 className="time-tag">
        Sent On: {date.toLocaleString()}
      </h5>
    );
  },

  toggleDetail: function() {
    if (this.state.detail) {
      this.setState({ detail: false });
    } else {
      this.setState({ detail: true });
    }
  },

  buttonContent: function() {
    if (this.state.detail) {
      return (
        <span className="glyphicon glyphicon-triangle-top"
          aria-hidden="true">
        </span>
      );
    } else {
      return (
        <span className="glyphicon glyphicon-triangle-bottom"
          aria-hidden="true">
        </span>
      );
    }
  },

  header: function() {
    return (
      <div className="row conversation-header">
        <h4 className="conversation-subject">
          {this.state.conversation.subject}
        </h4>
        <button
          className="btn btn-default btn-sm conversation-show-btn"
          onClick={this.toggleDetail}>
          {this.buttonContent()}
        </button>
      </div>
    );
  },

  responses: function() {
    var responseConversations =
      this.state.conversation.responses.map(function (response) {
        return (
          <li className="conversation-thread">
            <ConversationDetail
              conversation={response}
              type={this.oppositeType()}/>
          </li>
        );
      }.bind(this));

    return (
      <ul className="conversation-list">
        {responseConversations}
      </ul>
    );
  },

  detail: function() {
    if (this.state.detail) {
      return (
        <div className="width-fix">
          <p>{this.state.conversation.body}</p>
          {this.responses()}
        </div>
      );
    } else {
      return (
        <div className="width-fix">
        </div>
      );
    }
  },

  render: function() {
    return (
      <div className="thumbnail">
        <div className="caption">
          {this.header()}
          {this.location()}
          {this.time()}
          {this.detail()}
        </div>
      </div>
    );
  }

});

module.exports = ConversationDetail;
