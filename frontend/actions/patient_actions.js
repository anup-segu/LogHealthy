var hashHistory = require('react-router').hashHistory;

var AuthConstants = require('../constants/auth_constants');
var PatientConstants = require('../constants/patient_constants');
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

	receiveCurrentPatient: function(patient){
		AppDispatcher.dispatch({
			actionType: AuthConstants.LOGIN,
			patient: patient
		});
		AuthActions.closeForm();
		AuthActions.closePatientDoctorForm();
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

	createPatientDoctor: function (data) {
		PatientApiUtil.createPatientDoctor({
			url: "/api/patient_doctors",
			type: "post",
			data: { patient_doctor: data, ttype: "Patient" },
			success: function (patient) {
				AuthActions.closePatientDoctorForm();
				AppDispatcher.dispatch({
					actionType: PatientConstants.PATIENT_UPDATED,
					patient: patient
				});
			}
		});
	},

	viewDoctor: function (id) {
		PatientApiUtil.viewDoctor({
			url: "api/doctors/" + id,
			success: function (doctor) {
				PatientActions.serveDoctor(doctor);
			}
		});
	},

	serveDoctor: function (doctor) {
		AppDispatcher.dispatch({
			actionType: PatientConstants.VIEW_DOCTOR,
			doctor: doctor
		});
	},

	fetchAllPatients: function() {
		PatientApiUtil.fetchAllPatients({
			url: "api/patients",
			success: PatientActions.patientsReceived
		});
	},

	patientsReceived: function (patients) {
		AppDispatcher.dispatch({
			actionType: PatientConstants.PATIENTS_RECEIVED,
			patients: patients
		});
	}
};

module.exports = PatientActions;
