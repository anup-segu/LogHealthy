var React = require('react');
var LogDetail = require('./logs_detail.jsx');

var LogsIndex = React.createClass({
  logs: function() {
    var logData = this.props.logs;

    var elements = Object.keys(logData).map(function (date) {
      var index = Object.keys(logData).indexOf(date);

      return(
        <LogDetail
          key={date}
          date={date}
          log={logData[date]}
          index = {index} />
      );
    });

    return elements;
  },

  render: function() {
    return (
      <div className="container logs-list">
        {this.logs()}
      </div>
    );
  }

});

module.exports = LogsIndex;

// <div key={meal_type}>
//   {meal_type}
//   <ul key={log_data[date][meal_type]["id"]}>
//     <li key={"glucose" + log_data[date][meal_type]["id"]}>
//       Glucose: {log_data[date][meal_type]["glucose"]+" units"}
//     </li>
//     <li key={"carbs" + log_data[date][meal_type]["id"]}>
//       Carbs: {log_data[date][meal_type]["carbs"]+"g"}
//     </li>
//   </ul>
// </div>
