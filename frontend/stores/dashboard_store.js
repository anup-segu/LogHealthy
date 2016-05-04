var Store = require('flux/utils').Store;
var DashboardConstants = require('../constants/dashboard_constants.js');
var AppDispatcher = require('../dispatcher/dispatcher.js');

var _showSidebar = true;
var DashboardStore = new Store(AppDispatcher);

DashboardStore.expandSidebar = function() {
  _showSidebar = true;
};

DashboardStore.collapseSidebar = function() {
  _showSidebar = false;
};

DashboardStore.sidebarStatus = function() {
  return _showSidebar;
};

DashboardStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case DashboardConstants.EXPAND_SIDEBAR:
      DashboardStore.expandSidebar();
      break;
    case DashboardConstants.COLLAPSE_SIDEBAR:
      DashboardStore.collapseSidebar();
      break;
  }
  DashboardStore.__emitChange();
};

module.exports = DashboardStore;
