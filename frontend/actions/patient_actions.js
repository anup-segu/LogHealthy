var hashHistory = require('react-router').hashHistory;

var AuthConstants = require('../constants/auth_constants');
var AuthActions = require("../actions/auth_actions");
var PatientApiUtil = require('../util/patient_api_util');
var PatientStore = require('../stores/patient_store');
var AuthStore = require('../stores/auth_form_store');


var AppDispatcher = require('../dispatcher/dispatcher');
var DoctorActions = require('../actions/doctor_actions');

var PatientActions = {
	fetchCurrentPatient: function(){
		var patient = JSON.parse(localStorage.getItem("currentPatient"));
		if (patient) {
			PatientActions.receiveCurrentPatient(patient);
		} else {
			PatientApiUtil.fetchCurrentPatient(
	      PatientActions.receiveCurrentPatient,
	      function(){
	        return;
	      }
	    );
		}
	},

	signup: function(patient){
		PatientApiUtil.post({
			url: "api/patient",
			patient: patient,
			success: PatientActions.receiveCurrentPatient,
			error: PatientActions.handleError
		});
	},

	login: function(patient){
		PatientApiUtil.post({
			url: "api/session",
			patient: patient,
			success: function(user){
				PatientActions.receiveCurrentPatient(user);
				DoctorActions.receiveCurrentDoctor(user);
			},
			error: PatientActions.handleError
		});
	},

	guestLogin: function(){
		PatientActions.login({patientname: "guest", password: "password"});
	},

	receiveCurrentPatient: function(patient){
		AppDispatcher.dispatch({
			actionType: AuthConstants.LOGIN,
			patient: patient
		});
		AuthActions.closeForm();
	},

	handleError: function(error) {
		if (error.responseJSON) {
			AppDispatcher.dispatch({
				actionType: AuthConstants.ERROR,
				errors: error.responseJSON.errors,
				form: AuthStore.getForm()
			});
		}
	},

	removeCurrentPatient: function(){
		AppDispatcher.dispatch({
			actionType: AuthConstants.LOGOUT,
		});
	},

	logout: function(){
		PatientApiUtil.logout(
			PatientActions.removeCurrentPatient,
			PatientActions.handleError
		);
	},

	openPatientDoctorForm: function() {
		AppDispatcher.dispatch({
			actionType: AuthConstants.OPEN_PATIENT_DOCTOR
		});
	},

	createPatientDoctor: function (data) {
		PatientApiUtil.createPatientDoctor({
			url: "/api/patient_doctors",
			type: "post",
			data: { patient_doctor: data, ttype: "Patient" },
			success: function(){

			}
		});
	}
};

module.exports = PatientActions;
