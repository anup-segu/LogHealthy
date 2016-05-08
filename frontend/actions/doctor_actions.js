var AuthConstants = require('../constants/auth_constants');
var AuthActions = require("../actions/auth_actions");
var DoctorApiUtil = require('../util/doctor_api_util');
var DoctorStore = require('../stores/doctor_store');
var AuthStore = require('../stores/auth_form_store');
var DoctorConstants = require('../constants/doctor_constants');
var AppDispatcher = require('../dispatcher/dispatcher');
var PatientActions = require('../actions/patient_actions');

var DoctorActions = {
	fetchCurrentDoctor: function(){
		var doctor = JSON.parse(localStorage.getItem("currentDoctor"));
		if (doctor) {
			DoctorActions.receiveCurrentDoctor(doctor);
		} else {
			DoctorApiUtil.fetchCurrentDoctor(
				DoctorActions.receiveCurrentDoctor,
				function(){
					return;
				}
			);
		}
	},

	fetchAllDoctors: function() {
		DoctorApiUtil.fetchAllDoctors({
			url: "/api/doctors",
			success: DoctorActions.doctorsReceived
		});
	},

	doctorsReceived: function(doctors) {
		AppDispatcher.dispatch({
			actionType: DoctorConstants.DOCTORS_RECEIVED,
			doctors: doctors
		});
	},

	signup: function(doctor){
		DoctorApiUtil.post({
			url: "api/doctor",
			doctor: doctor,
			success: DoctorActions.receiveCurrentDoctor,
			error: DoctorActions.handleError
		});
	},

	login: function(doctor){
		DoctorApiUtil.post({
			url: "api/session",
			doctor: doctor,
			success: function(user){
				DoctorActions.receiveCurrentDoctor(user);
				PatientActions.receiveCurrentPatient(user);
			},
			error: DoctorActions.handleError
		});
	},

	guestLogin: function(){
		DoctorActions.login({doctorname: "guest", password: "password"});
	},

	receiveCurrentDoctor: function(doctor) {
		AppDispatcher.dispatch({
			actionType: AuthConstants.LOGIN,
			doctor: doctor
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

	removeCurrentDoctor: function(){
		AppDispatcher.dispatch({
			actionType: AuthConstants.LOGOUT,
		});
	},

	logout: function(){
		DoctorApiUtil.logout(
			DoctorActions.removeCurrentDoctor,
			DoctorActions.handleError
		);
	},

	viewPatient: function (id) {
		DoctorApiUtil.viewPatient({
			url: "api/patients/" + id,
			success: function (patient) {
				DoctorActions.servePatient(patient);
			}
		});
	},

	servePatient: function (patient) {
		AppDispatcher.dispatch({
			actionType: DoctorConstants.VIEW_PATIENT,
			patient: patient
		});
	},

	createDoctorPatient: function (data) {
		DoctorApiUtil.createDoctorPatient({
			url: "/api/patient_doctors",
			type: "post",
			data: { patient_doctor: data, ttype: "Doctor" },
			success: function (doctor) {
				AuthActions.closePatientDoctorForm();
				AppDispatcher.dispatch({
					actionType: DoctorConstants.DOCTOR_UPDATED,
					doctor: doctor
				});
			}
		});
	}
};

module.exports = DoctorActions;
