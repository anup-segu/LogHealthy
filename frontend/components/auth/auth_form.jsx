var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var hashHistory = require('react-router').hashHistory;
var Modal = require("react-modal");

var PatientActions = require("../../actions/patient_actions");
var CurrentPatientState = require("../../mixins/current_patient_state");
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
    this.setState({ form: "login" });
  },

  signUpForm: function() {
    this.setState({ form: "signup" });
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

    AuthActions.closeForm();
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

  greeting: function() {
    if (!this.state.currentPatient && !this.state.currentDoctor) {
      return;
    } else if (this.state.currentDoctor) {
      return (
        <div>
  				<h2>Welcome, Dr. {this.state.currentDoctor.last_name}</h2>
  				<input type="submit" value="logout" onClick={this.logout}/>
  			</div>
      );
    }
    return (
      <div>
				<h2>Welcome, {this.state.currentPatient.first_name}</h2>
				<input type="submit" value="logout" onClick={this.logout}/>
			</div>
    );
  },

  errors: function() {
    var self = this;
		if (this.state.patientErrors) {
      return (<ul>
  		{
  			Object.keys(this.state.patientErrors).map(function(key, i){
  				return (<li key={i}>{self.state.patientErrors[key]}</li>);
  			})
  		}
  		</ul>);
		} else if (this.state.doctorErrors) {
      return (<ul>
  		{
  			Object.keys(this.state.doctorErrors).map(function(key, i){
  				return (<li key={i}>{self.state.doctorErrors[key]}</li>);
  			})
  		}
  		</ul>);
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
        <form onSubmit={this.handleSubmit} className="form-horizontal">
          <div className="form-group">
  					<label
              htmlFor="email_field"
              className="col-sm-2 control-label">Email Address </label>
            <div className="col-sm-10">
              <input
                  type="text"
                  id="email_field"
                  className="form-control"
                  valueLink={this.linkState("email")}/>
            </div>
          </div>

          <div className="form-group">
  					<label
              htmlFor="password_field"
              className="col-sm-2 control-label">Password </label>
            <div className="col-sm-10">
              <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  valueLink={this.linkState("password")}/>
            </div>
          </div>

          <div className="form-group">
            <label
              htmlFor="first_name_field"
              className="col-sm-2 control-label">First Name</label>
            <div className="col-sm-10">
              <input
                  type="text"
                  id="first_name_field"
                  className="form-control"
                  valueLink={this.linkState("first_name")}/>
            </div>
          </div>

          <div className="form-group">
            <label
              htmlFor="last_name_field"
              className="col-sm-2 control-label">Last Name </label>
            <div className="col-sm-10">
              <input
                  type="text"
                  id="last_name_field"
                  className="form-control"
                  valueLink={this.linkState("last_name")}/>
            </div>
          </div>

          <div className="row patient-doctor-toggle">
            <div className="col-sm-4">
              <button
                onClick={this.createPatient}
                className="btn btn-default">Get started as a patient</button>
              <button
                onClick={this.createDoctor}
                className="btn btn-default">Get started as a doctor</button>
            </div>
          </div>

          <div className="container">
            <a
              href="#"
              onClick={this.signInForm}>Sign in to existing account</a>
          </div>
        </form>
      );
    } else if (this.state.form === "login") {
      form = (
        <form onSubmit={this.handleSubmit} className="form-horizontal">
          <div className="form-group">
            <label
              htmlFor="email_field"
              className="col-sm-2 control-label">Email Address </label>
            <div className="col-sm-10">
              <input
                type="text"
                id="email_field"
                className="form-control"
                valueLink={this.linkState("email")}/>
            </div>
          </div>

          <div className="form-group">
            <label
              htmlFor="password_field"
              className="col-sm-2 control-label">Password </label>
            <div className="col-sm-10">
              <input
                type="password"
                id="password_field"
                className="form-control"
                valueLink={this.linkState("password")}/>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4">
              <button className="btn btn-default">Sign In</button>
              <a
                href="#"
                onClick={this.signUpForm}>Create a new account</a>
            </div>
          </div>
        </form>
      );
    }

    return (
      form
    );
  },

  closeModal: function(){
    this.setState({ modalOpen: false });
  },

  openModal: function(){
    this.setState({ modalOpen: true });
  },

  render: function() {
    return (
      <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.closeModal}>
        <div id="login-form" className="container splash-form">
          {this.greeting()}
          {this.errors()}
          {this.form()}
        </div>
      </Modal>
    );
  }

});

module.exports = LogInForm;
