var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var hashHistory = require('react-router').hashHistory;
var Modal = require("react-modal");

var PatientActions = require("../../actions/patient_actions");
var CurrentPatientState = require("../../mixins/current_patient_state");

var style = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  content: {
    width: '55%',
    height: '100%',
    marginTop: '5%',
    marginLeft: "auto",
    marginRight: "auto",
    minWidth: '500px',
    maxWidth: '550px',
    maxHeight: '500px'
  }
};

var DoctorActions = require("../../actions/doctor_actions");
var AuthStore = require("../../stores/auth_form_store.js");
var AuthActions = require("../../actions/auth_actions");

var LogInForm = React.createClass({
  mixins: [LinkedStateMixin, CurrentPatientState],

  blankAttrs: {
    email: "",
    password: "",
    first_name: "",
    last_name: ""
  },

  model: "patient",

  getInitialState: function() {
    return { form: "signup", modalOpen: false };
  },

  componentDidMount: function() {
    this.authListener = AuthStore.addListener(this._toggleModal);
  },

  componentWillUnmount: function() {
    this.authListener.remove();
  },

  _toggleModal: function() {
    this.setState(AuthStore.modalState());
  },

  signInForm: function() {
    AuthActions.openSignInForm();
  },

  signUpForm: function() {
    AuthActions.openCreateForm();
  },

  button: function() {
    if (this.state.form === "signup") {
      return "Get Started";
    } else if (this.state.form === "login") {
      return "Sign In";
    }
  },

  handleSubmit: function (event) {
    event.preventDefault();
    if (this.model === "patient") {
      var actions = PatientActions;
    } else if (this.model === "doctor") {
      actions = DoctorActions;
    }
    actions[this.state.form]({
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name
    });
  },

  createDoctor: function(event) {
    if (this.model === "patient") {
      this.model = "doctor";
    }
    this.handleSubmit(event);
  },

  createPatient: function(event) {
    if (this.model === "doctor") {
      this.model = "patient";
    }
    this.handleSubmit(event);
  },

  logout: function(event){
		event.preventDefault();
		PatientActions.logout();
    DoctorActions.logout();
    this.setState(this.blankAttrs);
  },

  errors: function() {
    var self = this;
		if (this.state.patientErrors) {
      return (
        <div className="error-box">
          <p>Woops, please check the following:</p>
          <ul>
        		{
        			Object.keys(this.state.patientErrors).map(function(key, i){
        				return (<li key={i}>{self.state.patientErrors[key]}</li>);
        			})
        		}
    		  </ul>
        </div>
      );
		} else if (this.state.doctorErrors) {
      return (
        <div className="error-box">
          <p>Woops, please check the following:</p>
          <ul>
        		{
        			Object.keys(this.state.doctorErrors).map(function(key, i){
        				return (<li key={i}>{self.state.doctorErrors[key]}</li>);
        			})
        		}
      		</ul>
        </div>
      );
    }
    return;
	},

  form: function(){
    if (this.state.currentPatient || this.state.currentDoctor) {
      return;
    }

    var form;

    if (this.state.form === "signup") {
      form = (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
  					<label
              htmlFor="email_field"
              className="control-label">Email Address </label>
            <input
                type="text"
                id="email_field"
                className="form-control"
                placeholder="name@example.com"
                valueLink={this.linkState("email")}/>
          </div>

          <div className="form-group">
  					<label
              htmlFor="password_field"
              className="control-label">Password </label>
            <input
                type="password"
                id="password_field"
                className="form-control"
                placeholder="minimum 6 characters"
                valueLink={this.linkState("password")}/>
          </div>

          <div className="form-group">
            <label
              htmlFor="first_name_field"
              className="control-label">First Name</label>
            <input
                type="text"
                id="first_name_field"
                className="form-control"
                placeholder="first name"
                valueLink={this.linkState("first_name")}/>
          </div>

          <div className="form-group">
            <label
              htmlFor="last_name_field"
              className="control-label">Last Name </label>
            <input
                type="text"
                id="last_name_field"
                className="form-control"
                placeholder="last name"
                valueLink={this.linkState("last_name")}/>
          </div>

          <div className="row patient-doctor-toggle">

              <button
                onClick={this.createPatient}
                className="btn btn-patient-form">
                Get started as a patient</button>
              <button
                onClick={this.createDoctor}
                className="btn btn-doctor-form">
                Get started as a doctor</button>

          </div>

          <div className="container">
            <a
              href="#"
              onClick={this.signInForm}>Sign in to existing account</a>
            <br/>
            <a
              href="#"
              onClick={this.closeModal}>Go Back</a>
          </div>
        </form>
      );
    } else if (this.state.form === "login") {
      form = (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label
              htmlFor="email_field"
              className="control-label">Email Address </label>
            <input
              type="text"
              id="email_field"
              className="form-control"
              placeholder="name@example.com"
              valueLink={this.linkState("email")}/>
          </div>

          <div className="form-group">
            <label
              htmlFor="password_field"
              className="control-label">Password </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              placeholder="minimum 6 characters"
              valueLink={this.linkState("password")}/>
          </div>

          <div className="row">
            <button className="btn btn-login-form">Sign In</button>
            <br/>
          </div>
          <div className="row login-alt-options">
            <a href="#"
              onClick={this.signUpForm}>Create a new account</a>
            <a href="#"
              onClick={this.closeModal}>Go Back</a>
          </div>
        </form>
      );
    }
    return (
      form
    );
  },

  closeModal: function() {
    AuthActions.closeForm();
  },

  openModal: function() {
    this.setState({ modalOpen: true });
  },

  render: function() {
    if (this.state.form === "signup") {
      var title = "Create A New Account";
    } else if (this.state.form === "login") {
      title = "Sign In to An Existing Account";
    }
    return (
      <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.closeModal}
        style={style}>
        <div id="login-form" className="container splash-form">
          <h3>{title}</h3>
          {this.errors()}
          {this.form()}
        </div>
      </Modal>
    );
  }

});

module.exports = LogInForm;
