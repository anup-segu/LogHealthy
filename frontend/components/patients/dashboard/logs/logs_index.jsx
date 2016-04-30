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
