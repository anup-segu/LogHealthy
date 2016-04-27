var PatientStore = require('../stores/patient_store');
var PatientActions = require('../actions/patient_actions');

var CurrentPatientState = {

	getInitialState: function(){
		return {
			currentPatient: PatientStore.currentPatient(),
			patientErrors: PatientStore.errors()
		};
	},
	componentDidMount: function(){
		PatientStore.addListener(this.updatePatient);
		if (typeof PatientStore.currentPatient() === 'undefined') {
			PatientActions.fetchCurrentPatient();
		}
	},
	updatePatient: function(){
		this.setState({
			currentPatient: PatientStore.currentPatient(),
			patientErrors: PatientStore.errors()
		});
	}

};

module.exports = CurrentPatientState;
