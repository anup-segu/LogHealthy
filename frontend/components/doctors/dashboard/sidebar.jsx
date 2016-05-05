var React = require('react');

var DashboardActions = require('../../../actions/dashboard_actions.js');
var DashboardStore = require('../../../stores/dashboard_store.js');

var Sidebar = React.createClass({
  getInitialState: function() {
    return ({buttonText: true, sidebar: "show" });
  },

  componentDidMount: function() {
    this.setState({buttonText: true, sidebar: "show" });
    this.dashboardListener = DashboardStore.addListener(this._updateSidebar);
  },

  componentWillUnmount: function() {
    this.dashboardListener.remove();
  },

  _updateSidebar: function() {
    if (DashboardStore.sidebarStatus()) {
      this.setState({ sidebar: "out" });
    } else {
      this.setState({ sidebar: "in" });
    }
  },

  collapse: function (event) {
    event.preventDefault();
    if (this.state.sidebar === "show" || this.state.sidebar === "out") {
      DashboardActions.collapseSidebar();
    } else {
      DashboardActions.expandSidebar();
    }
  },

  createConversation: function (event) {
    event.preventDefault();
    DashboardActions.openTab("conversations", "new");
  },

  sidebarClass: function() {
    if (this.state.sidebar === "show") {
      return "container sidebar";
    } else if (this.state.sidebar === "in") {
      return "container sidebar collapse-in";
    } else if (this.state.sidebar === "out") {
      return "container sidebar collapse-out";
    }
  },

  sidebarContent: function() {
    if (this.state.sidebar === "out" || this.state.sidebar === "show") {
      return (
        <div className="container sidebar-content">
          <ul className="list-unstyled">
            <div className="container width-fix collapse-container">
              <span className="glyphicon glyphicon-remove collapse-icon"
                onClick={this.collapse}
                aria-hidden="true"></span>
            </div>
            <div className="sidebar-actions">
              <button
                className="btn btn-lg sidebar-btn"
                onClick={this.createConversation}>
                <span
                  className="glyphicon glyphicon-envelope"
                  aria-hidden="true"></span> Contact Doctor
              </button>
            </div>
          </ul>
        </div>
      );
    } else {
      return;
    }
  },

  render: function() {
    return (
      <div className={this.sidebarClass()}>
        {this.sidebarContent()}
      </div>
    );
  }

});

module.exports = Sidebar;
