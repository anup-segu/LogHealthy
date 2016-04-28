var React = require('react');

var Sidebar = require('./sidebar.jsx');
var Tabs = require('./tabs.jsx');

var Dashboard = React.createClass({

  render: function() {
    return (
      <div className="container-fluid content-view">
        <Sidebar />
        <div className="container dashboard">
          <Tabs />
        </div>
      </div>
    );
  }

});

module.exports = Dashboard;
