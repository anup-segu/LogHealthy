var React = require('react');

var LogsIndex = React.createClass({
  logs: function() {
    var log_data = this.props.logs;
    var elements = Object.keys(log_data).map(function (date){

      var data = Object.keys(log_data[date]).map(function (meal_type){
        return (
          <div key={meal_type}>
            {meal_type}
            <ul key={log_data[date][meal_type]["id"]}>
              <li key={"glucose" + log_data[date][meal_type]["id"]}>
                Glucose: {log_data[date][meal_type]["glucose"]+" units"}
              </li>
              <li key={"carbs" + log_data[date][meal_type]["id"]}>
                Carbs: {log_data[date][meal_type]["carbs"]+"g"}
              </li>
            </ul>
          </div>
        );
      });

      return(
        <div key={date} className="panel panel-default date-panel">
          <div className="panel-heading">
            <h4>{date}</h4>
          </div>
          <div className="panel-body">
            {data}
          </div>
        </div>
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
