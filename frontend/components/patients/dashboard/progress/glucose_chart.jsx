var React = require('react');
var PropTypes = React.PropTypes;

var LineChart = require('./line_chart.jsx');

var GlucoseChart = React.createClass({

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12" >
            <div className=""
              id="top-line-chart">
              <div>
                <div className="">
                  <LineChart glucose={this.props.glucose}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = GlucoseChart;
