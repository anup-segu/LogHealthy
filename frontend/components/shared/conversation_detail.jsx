var React = require('react');
var Collapse = require('react-bootstrap/lib/Collapse');

var ConversationForm = require('./conversation_form.jsx');

var ConversationDetail = React.createClass({
  getInitialState: function() {
    return {
      conversation: this.props.conversation,
      type: this.props.type,
      response: this.props.response,
      detail: false,
      form: false
    };
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({ conversation: newProps.conversation, form: false });
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
      this.setState({ detail: false, form: false });
    } else {
      this.setState({ detail: true });
    }
  },

  toggleReply: function() {
    if (this.state.form) {
      this.refs.replyFormElement.clearForm();
      this.setState({ form: false });
    } else {
      this.setState({ form: true, detail: true });
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

  buttonReplyContent: function() {
    if (this.state.form) {
      return (
        <span className="glyphicon glyphicon-remove-circle"
          aria-hidden="true">
        </span>
      );
    } else {
      return (
        <span className="glyphicon glyphicon-share-alt"
          aria-hidden="true">
        </span>
      );
    }
  },

  header: function() {
    if (this.props.response) {
      var subjectLine = (
        <h5 className="conversation-subject">
          Re: {this.state.conversation.subject}
        </h5>
      );
    } else {
      subjectLine = (
        <h4 className="conversation-subject">
          {this.state.conversation.subject}
        </h4>
      );
    }

    return (
      <div className="row conversation-header">
        {subjectLine}
        <button
          className="btn btn-default btn-sm conversation-show-btn"
          onClick={this.toggleDetail}>
          {this.buttonContent()}
        </button>
        <button
          className="btn btn-default btn-sm conversation-show-btn"
          onClick={this.toggleReply}>
          {this.buttonReplyContent()}
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
          {this.replyForm()}
          {this.responses()}
        </div>
      </Collapse>
    );
  },

  replyForm: function() {
    return (
      <Collapse in={this.state.form}>
        <div className="width-fix">
          <ConversationForm
            ref="replyFormElement"
            parent={this.state.conversation} />
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
