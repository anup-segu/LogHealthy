var React = require('react');
var Collapse = require('react-bootstrap/lib/Collapse');

var ReplyForm = require('./reply_form.jsx');

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
        <span className="glyphicon glyphicon-remove"
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
        <h3 className="conversation-subject">
          {this.state.conversation.subject}
        </h3>
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
          className="btn btn-default btn-sm conversation-reply-btn"
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
          <li key={response.id} className="conversation-thread">
            <ConversationDetail
              key={response.id}
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

  detailClass: function() {
    if (this.props.response) {
      return "detail-reply";
    } else {
      return "detail-main";
    }
  },

  detail: function() {
    return (
      <Collapse in={this.state.detail}>
        <div className="width-fix">
          <p className={this.detailClass()}>{this.state.conversation.body}</p>
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
          <ReplyForm
            ref="replyFormElement"
            parent={this.state.conversation} />
        </div>
      </Collapse>
    );
  },

  render: function() {
    return (
      <div className="thumbnail conversation-outline">
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
