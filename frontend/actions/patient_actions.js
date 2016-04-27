var AuthConstants = require('../constants/auth_constants');
var PatientApiUtil = require('../util/patient_api_util');
var PatientStore = require('../stores/patient_store');
var AppDispatcher = require('../dispatcher/dispatcher');

var PatientActions = {
	fetchCurrentPatient: function(){
		PatientApiUtil.fetchCurrentPatient(
      PatientActions.receiveCurrentPatient,
      function(){
        return;
      }
    );
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
			success: PatientActions.receiveCurrentPatient,
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
	},

	handleError: function(error) {
		if (error.responseJSON) {
			AppDispatcher.dispatch({
				actionType: AuthConstants.ERROR,
				errors: error.responseJSON.errors
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
	}
};

module.exports = PatientActions;
