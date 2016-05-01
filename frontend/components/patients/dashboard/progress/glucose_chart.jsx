var React = require('react');
var PropTypes = React.PropTypes;

var LineChart = require('./line_chart.jsx');

var GlucoseChart = React.createClass({

  render: function() {
    return (
      <div className="chart-container">
        <LineChart glucose={this.props.glucose}/>
      </div>
    );
  }

});

module.exports = GlucoseChart;
