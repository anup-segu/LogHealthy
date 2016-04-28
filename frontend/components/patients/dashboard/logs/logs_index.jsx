var React = require('react');

var LogsIndex = React.createClass({

  render: function() {
    var logs = this.props.logs.map( function(log) {
      return (
        <li key={log.id}>
          <ul>
            <li>Date: {log.date}</li>
            <li>Meal: {log.meal_type}</li>
            <li>Glucose: {log.glucose}</li>
          </ul>
        </li>
      );
    });

    return (
      <ul>
        {logs}
      </ul>
    );
  }

});

module.exports = LogsIndex;
