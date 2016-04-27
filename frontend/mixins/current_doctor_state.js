var DoctorStore = require('../stores/doctor_store');
var DoctorActions = require('../actions/doctor_actions');

var CurrentDoctorState = {

	getInitialState: function(){
		return {
			currentDoctor: DoctorStore.currentDoctor(),
			doctorErrors: DoctorStore.errors()
		};
	},
	componentDidMount: function(){
		DoctorStore.addListener(this.updateDoctor);
		if (typeof DoctorStore.currentDoctor() === 'undefined') {
			DoctorActions.fetchCurrentDoctor();
		}
	},
	updateDoctor: function(){
		this.setState({
			currentDoctor: DoctorStore.currentDoctor(),
			doctorErrors: DoctorStore.errors()
		});
	}

};

module.exports = CurrentDoctorState;
