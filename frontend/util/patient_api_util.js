var AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
	post: function(options){
		$.ajax({
			url: options.url,
			type: "post",
			data: {patient: options.patient},
			success: options.success,
			error: options.error
		});
	},

	logout: function(success, error){
		$.ajax({
			url: '/api/session',
			method: 'delete',
			success: success,
			error: error
		});
	},

	fetchCurrentPatient: function(success, error){
		$.ajax({
			url: '/api/session',
			method: 'get',
			success: success,
			error: error
		});
	},

	createPatientDoctor: function (options) {
		$.ajax({
			url: options.url,
			type: options.type,
			data: options.data,
			success: options.success
		});
	},

	viewDoctor: function (options) {
		$.ajax({
			url: options.url,
			success: options.success
		});
	}
};
