var React = require('react');
var PropTypes = React.PropTypes;

var LogForm = require('./logs/logs_form.jsx');
var LogActions = require('../../../actions/log_actions.js');

var Sidebar = React.createClass({

  getInitialState: function() {
    return ({buttonText: true});
  },

  componentDidMount: function() {
    this.setState({buttonText: true});
    this.resize = window.addEventListener("resize", this._updateButtonText);
  },

  componentWillUnmount: function() {
    if (this.resize) {
      this.resize.remove();
    }
  },

  _updateButtonText: function() {
    if ($(window).width() < 790) {
      this.setState({ buttonText: false });
    } else {
      this.setState({ buttonText: true });
    }
  },

  buttonText: function() {
    if (this.state.buttonText) {
      return (
        <span>
          <span
            className="glyphicon glyphicon-edit"
            aria-hidden="true"></span> Create a new log
        </span>
      );
    } else {
      return <span
        className="glyphicon glyphicon-edit"
        aria-hidden="true"></span>;
    }
  },

  buttonClass: function() {
    if (this.state.buttonText) {
      return "btn btn-success";
    } else {
      return "btn btn-lg btn-success";
    }
  },

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
                className={this.buttonClass()}
                onClick={this.openForm}>
                {this.buttonText()}
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
