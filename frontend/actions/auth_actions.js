var AppDispatcher = require('../dispatcher/dispatcher');
var AuthConstants = require('../constants/auth_constants');

module.exports = {
  openSignInForm: function() {
    AppDispatcher.dispatch({
      actionType: AuthConstants.OPEN_SIGN_IN_FORM,
      modalOpen: true
    });
  },

  openCreateForm: function() {
    AppDispatcher.dispatch({
      actionType: AuthConstants.OPEN_CREATE_FORM,
      modalOpen: true
    });
  },

  openPatientDoctorForm: function() {
    AppDispatcher.dispatch({
      actionType: AuthConstants.OPEN_PATIENT_DOCTOR
    });
  },

  closePatientDoctorForm: function() {
    AppDispatcher.dispatch({
      actionType: AuthConstants.CLOSE_PATIENT_DOCTOR
    });
  },

  closeForm: function() {
    AppDispatcher.dispatch({
      actionType: AuthConstants.CLOSE_FORM,
      modalOpen: false
    });
  }
};
