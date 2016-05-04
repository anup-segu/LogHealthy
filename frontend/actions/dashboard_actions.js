var AppDispatcher = require('../dispatcher/dispatcher');
var DashboardConstants = require('../constants/dashboard_constants.js');

module.exports = {
  collapseSidebar: function() {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.COLLAPSE_SIDEBAR
    });
  },

  expandSidebar: function() {
    AppDispatcher.dispatch({
      actionType: DashboardConstants.EXPAND_SIDEBAR
    });
  }
};
