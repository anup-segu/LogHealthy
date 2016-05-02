var React = require('react');
var PropTypes = React.PropTypes;

var PatientDetail = React.createClass({
  getInitialState: function() {
    return { patient: this.props.patient };
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({ patient: newProps.patient });
  },

  render: function() {
    return (
      <div className="container">
        <ul>
          <li>{this.state.patient.first_name}</li>
          <li>{this.state.patient.last_name}</li>
        </ul>
      </div>
    );
  }

});

module.exports = PatientDetail;
