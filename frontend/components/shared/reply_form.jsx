var React = require('react');

var ConversationActions = require('../../actions/conversation_actions.js');
var PatientStore = require('../../stores/patient_store.js');

var ConversationForm = React.createClass({
  getInitialState: function() {
    return {
      subject: this.props.parent.subject,
      parent_id: this.props.parent.id,
      recipient_id: this.props.parent.author_id,
      recipient_type: this.props.parent.author_type,
      body: ""
    };
  },

  updateBody: function (event) {
    event.preventDefault();
    this.setState({ body: event.target.value });
  },

  handleSubmit: function (event) {
    event.preventDefault();
    if (PatientStore.currentPatient()) {
      ConversationActions.createConversation({
        author_id: PatientStore.currentPatient().id,
        author_type: "Patient",
        subject: this.state.subject,
        parent_id: this.state.parent_id,
        recipient_id: this.state.recipient_id,
        recipient_type: this.state.recipient_type,
        body: this.state.body
      });
    } else {
      ConversationActions.createConversation({
        subject: this.state.subject,
        parent_id: this.state.parent_id,
        recipient_id: this.state.recipient_id,
        recipient_type: this.state.recipient_type,
        body: this.state.body
      });
    }
    this.clearForm();
  },

  clearForm: function() {
    this.refs.textInputRef.value = "";
  },

  render: function() {
    return (
      <form
        className="reply-form"
        onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="reply-field">Respond to this conversation</label>
          <textarea
            ref="textInputRef"
            id="reply-field"
            className="form-control"
            defaultValue=""
            placeholder="Your response here"
            rows="3"
            onChange={this.updateBody}></textarea>
        </div>
        <button
          className="btn btn-reply-submit"
          disabled={this.state.body ? false : true}>Reply</button>
      </form>
    );
  }

});

module.exports = ConversationForm;
