var AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
	post: function(options){
		$.ajax({
			url: options.url,
			type: "post",
			data: {doctor: options.doctor},
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

	fetchCurrentDoctor: function(success, error){
		$.ajax({
			url: '/api/session',
			method: 'get',
			success: success,
			error: error
		});
	},

	fetchAllDoctors: function (options) {
		$.ajax({
			url: options.url,
			method: 'get',
			success: options.success
		});
	},

	viewPatient: function (options) {
		$.ajax({
			url: options.url,
			method: 'get',
			success: options.success
		});
	},
};
