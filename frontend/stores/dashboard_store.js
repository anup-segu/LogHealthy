var Store = require('flux/utils').Store;
var DashboardConstants = require('../constants/dashboard_constants.js');
var PatientStore = require('../stores/patient_store.js');
var AppDispatcher = require('../dispatcher/dispatcher.js');

var _showSidebar = true;
var _tab = "logs", _subTab = "inbox";
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

DashboardStore.setTabs = function (tab, subTab) {
  _tab = tab;
  _subTab = subTab;
};

DashboardStore.tabStatus = function() {
  var tab = _tab;
  return tab;
};

DashboardStore.subTabStatus = function() {
  var subTab = _subTab;
  return subTab;
};

DashboardStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case DashboardConstants.EXPAND_SIDEBAR:
      DashboardStore.expandSidebar();
      break;
    case DashboardConstants.COLLAPSE_SIDEBAR:
      DashboardStore.collapseSidebar();
      break;
    case DashboardConstants.NAVIGATE:
      DashboardStore.setTabs(payload.tab, payload.subTab);
      break;
  }
  DashboardStore.__emitChange();
};

module.exports = DashboardStore;
