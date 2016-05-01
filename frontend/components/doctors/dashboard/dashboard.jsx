var React = require('react');

var DoctorStore = require('../../../stores/doctor_store.js');
var Sidebar = require('./sidebar.jsx');
var Tabs = require('./tabs.jsx');

var DashBoard = React.createClass({
  getInitialState: function() {
    return {render: false};
  },

  componentDidMount: function() {
    this.doctorListener = DoctorStore.addListener(this._checkLogin);
  },

  componentWillUnmount: function() {
    this.doctorListener.remove();
  },

  _checkLogin: function() {
    var doctor = DoctorStore.currentDoctor();
    if (doctor) {
      this.setState({ render: true });
    } else {
      this.setState({ render: false });
    }
  },

  render: function() {
    if (this.state.render) {
      return (
        <div className="container-fluid content-view">
          <Sidebar />
          <div className="container dashboard">
            <Tabs />
          </div>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }

});

module.exports = DashBoard;
