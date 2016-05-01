var React = require('react');
var PropTypes = React.PropTypes;

var LineChart = require('./line_chart.jsx');

var GlucoseChart = React.createClass({
  getInitialState: function() {
    return { glucose: this.props.glucose };
  },

  componentWillReceiveProps: function (newprops) {
    this.setState({ glucose: newprops.glucose });
  },

  render: function() {
    return (
      <div className="chart-container">
        <LineChart glucose={this.state.glucose}/>
      </div>
    );
  }

});

module.exports = GlucoseChart;
