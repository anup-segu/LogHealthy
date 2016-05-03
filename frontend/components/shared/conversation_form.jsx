var React = require('react');
var Clearfix = require('react-bootstrap/lib/Clearfix');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var ConversationActions = require('../../actions/conversation_actions.js');
var ConversationStore = require('../../stores/conversation_store.js');

var ConversationForm = React.createClass({
  getInitialState: function() {
    if (this.props.doctor) {
      return {
        doctor: this.props.doctor,
        recipient_id: this.props.doctor.id,
        recipient_type: "Doctor",
        subject: "",
        body: "",
        searchStr: "",
        submitted: false
      };
    }
    return {
      patients: this.props.patients,
      recipient_id: null,
      recipient_type: "Patient",
      subject: "",
      body: "",
      searchStr: "",
      submitted: false
    };
  },

  componentDidMount: function() {
    this.conversationListener =
      ConversationStore.addListener(this._updateStatus);
  },

  componentWillUnmount: function() {
    this.conversationListener.remove();
  },

  _updateStatus: function() {
    var status = ConversationStore.status();

    if (status && this.state.patients) {
      this.setState({
        submitted: status,
        errors: ConversationStore.errors(),
        recipient_id: null,
        recipient_type: "Patient",
        subject: "",
        body: "",
        searchStr: "",
      });
      if (this.refs.subjectField) {
        this.refs.subjectField.value = "";
      }
      if (this.refs.bodyField) {
        this.refs.bodyField.value = "";
      }
      if (this.refs.searchBar) {
        this.refs.searchBar.value = "";
      }
    } else if (status && this.state.doctor) {
      this.setState({
        submitted: status,
        errors: ConversationStore.errors(),
        subject: "",
        body: ""
      });
      if (this.refs.subjectField) {
        this.refs.subjectField.value = "";
      }
      if (this.refs.bodyField) {
        this.refs.bodyField.value = "";
      }
    } else {
      this.setState({
        submitted: status,
        errors: ConversationStore.errors()
      });
    }
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({ patients: newProps.patients});
  },

  updateSearch: function (event) {
    event.preventDefault();
    this.setState({ searchStr: event.target.value });
  },

  matches: function() {
    if (this.state.searchStr.length > 0) {
      var matchedPatients = [];

      this.state.patients.forEach( function (patient) {
        var patientName = patient.first_name + " " + patient.last_name;
        patientName = patientName.toLowerCase();
        if (patientName.indexOf(this.state.searchStr.toLowerCase()) > -1) {
          matchedPatients.push(patient);
        }
      }.bind(this));

      if (matchedPatients.length > 0) {
        var header = <MenuItem header>Matches</MenuItem>;
      } else {
        header = <MenuItem header>No Matches</MenuItem>;
      }
      matchedPatients = matchedPatients.map( function(patient) {
        var patientName = patient.first_name+" "+patient.last_name;
        return (
          <MenuItem
            key={patient.id}
            onSelect={this.selectPatient}
            value={patientName}
            eventKey={patient.id}>
            {patientName}</MenuItem>
        );
      }.bind(this));

      return (
        <ul className="dropdown-menu patient-hits form-hits">
         {header}
         {matchedPatients}
        </ul>
      );
    }
    return;
  },

  selectPatient: function (eventKey, event) {
    this.refs.searchBar.value = event.target.firstChild.data;
    this.setState({ recipient_id: eventKey, searchStr: "" });
  },

  updateSubject: function (event) {
    event.preventDefault();
    this.setState({ subject: event.target.value });
  },

  updateBody: function (event) {
    event.preventDefault();
    this.setState({ body: event.target.value });
  },

  handleSubmit: function (event) {
    event.preventDefault();
    ConversationActions.createConversation({
      subject: this.state.subject ? this.state.subject : "(No Subject)",
      recipient_id: this.state.recipient_id,
      recipient_type: this.state.recipient_type,
      body: this.state.body
    });
  },

  message: function() {
    if (this.state.submitted) {
      return (
        <div className="alert alert-success width-fix" role="alert">
          Message was sent!
        </div>
      );
    } else if (this.state.errors) {
      var errors = this.state.errors.map(function (error, i){
        return <li key={i}>{error}</li>;
      });
      return (
        <div className="alert alert-danger" role="alert">
          <ul>
            {errors}
          </ul>
        </div>
      );
    }
    return;
  },

  searchField: function() {
    if (this.state.doctor) {
      var name =
        this.state.doctor.first_name+" "+this.state.doctor.last_name;
      return (
        <div className="form-group">
          <label htmlFor="to-field">Recipient: </label>
          <input
            type="text"
            id="subject-field"
            ref="subjectField"
            className="form-control"
            defaultValue={name}
            disabled={true}
            placeholder="Your subject here"/>
          <p className="help-block">
            We will send this to your doctor, no need to specify.</p>
        </div>
      );
    }
    return (
      <div className="form-group">
        <label htmlFor="to-field">Recipient: </label>
        <div className="input-group patient-search-bar form-search">
          <input
            type="text"
            ref="searchBar"
            className="form-control"
            defaultValue=""
            onChange={this.updateSearch}
            placeholder="Search your recipient by name... ex. Demo"
            aria-describedby="basic-addon2" />
          <span
            className="input-group-addon"
            id="basic-addon2">
            <span
              className="glyphicon glyphicon-search"
              aria-hidden="true"></span>
          </span>
          {this.matches()}
        </div>
      </div>
    );
  },

  render: function() {
    return (
      <form className="reply-form"
        onSubmit={this.handleSubmit}>
        {this.message()}
        {this.searchField()}
        <div className="form-group">
          <label htmlFor="subject-field">Subject: </label>
          <input
            type="text"
            id="subject-field"
            ref="subjectField"
            className="form-control"
            defaultValue=""
            placeholder="Your subject here"
            onChange={this.updateSubject}/>
        </div>
        <div className="form-group">
          <label htmlFor="body-field">Body: </label>
          <textarea
            ref="textInputRef"
            id="body-field"
            ref="bodyField"
            className="form-control"
            defaultValue=""
            placeholder="Your content here"
            rows="3"
            onChange={this.updateBody}></textarea>
        </div>
        <button className="btn btn-primary">
          <span className="glyphicon glyphicon-envelope"
            aria-hidden="true"></span> Send</button>
      </form>
    );
  }

});

module.exports = ConversationForm;
