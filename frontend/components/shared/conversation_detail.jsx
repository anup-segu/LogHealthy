var React = require('react');
var Collapse = require('react-bootstrap/lib/Collapse');

var ConversationDetail = React.createClass({
  getInitialState: function() {
    return {
      conversation: this.props.conversation,
      type: this.props.type,
      response: this.props.response,
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
    if (this.props.response) {
      return (
        <div className="row conversation-header">
          <h5 className="conversation-subject">
            Re: {this.state.conversation.subject}
          </h5>
          <button
            className="btn btn-default btn-sm conversation-show-btn"
            onClick={this.toggleDetail}>
            {this.buttonContent()}
          </button>
        </div>
      );
    }
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
              type={this.oppositeType()}
              response={true}/>
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
    return (
      <Collapse in={this.state.detail}>
        <div className="width-fix">
          <p>{this.state.conversation.body}</p>
          {this.responses()}
        </div>
      </Collapse>
    );
  },

  render: function() {
    return (
      <div className="thumbnail">
        <div className="caption conversation-box">
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
