var AuthConstants = require('../constants/auth_constants');
var DoctorApiUtil = require('../util/doctor_api_util');
var DoctorStore = require('../stores/doctor_store');
var AppDispatcher = require('../dispatcher/dispatcher');

var DoctorActions = {
	fetchCurrentDoctor: function(){
		DoctorApiUtil.fetchCurrentDoctor(
      DoctorActions.receiveCurrentDoctor,
      function(){
        return;
      }
    );
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
			success: DoctorActions.receiveCurrentDoctor,
			error: DoctorActions.handleError
		});
	},

	guestLogin: function(){
		DoctorActions.login({doctorname: "guest", password: "password"});
	},

	receiveCurrentDoctor: function(doctor){
		AppDispatcher.dispatch({
			actionType: AuthConstants.LOGIN,
			doctor: doctor
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
	}
};

module.exports = DoctorActions;
