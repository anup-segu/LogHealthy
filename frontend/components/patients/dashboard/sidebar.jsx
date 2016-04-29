var React = require('react');
var PropTypes = React.PropTypes;

var LogForm = require('./logs/logs_form.jsx');
var LogActions = require('../../../actions/log_actions.js');

var Sidebar = React.createClass({

  openForm: function() {
    LogActions.openForm();
  },

  render: function() {
    return (
      <div className="container sidebar">
        <div className="container sidebar-content">
          <ul className="list-unstyled">
            <li>
              <button
                className="btn btn-success"
                onClick={this.openForm}>
                Create A New Log
              </button>
            </li>
          </ul>
        </div>
        <LogForm />
      </div>
    );
  }

});

module.exports = Sidebar;
