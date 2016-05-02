var React = require('react');
var PropTypes = React.PropTypes;

var ConversationDetail = React.createClass({
  getInitialState: function() {
    return {
      conversation: this.props.conversation,
      type: this.props.type
    };
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({ conversation: newProps.conversation });
  },

  location: function() {
    if (this.state.type === "inbound") {
      return (
        <h5 className="location-tag">
          {"From: " + this.state.conversation.author_id}
        </h5>
      );
    } else if (this.state.type === "outbound") {
      return (
        <h5 className="location-tag">
          {"To: " + this.state.conversation.recipient_id}
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

  render: function() {
    return (
      <div className="thumbnail">
        <div className="caption">
          <h4>{this.state.conversation.subject}</h4>
          {this.location()}
          {this.time()}
          <p>{this.state.conversation.body}</p>
        </div>
      </div>
    );
  }

});

module.exports = ConversationDetail;
