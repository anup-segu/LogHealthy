var React = require('react');
var d3 = require('d3');

var Dots = require('./dots.jsx');

var LineChart=React.createClass({
    propTypes: {
        width:React.PropTypes.number,
        height:React.PropTypes.number,
        chartId:React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            width: $(window).width()*.6,
            height: $(window).width()*.4,
            chartId: 'v1_chart'
        };
    },

    getInitialState: function() {
        return {
            width:this.props.width
        };
    },

    parseGlucoseData: function(mealType) {
      // var self = this;
      if (this.props.glucose) {
        return Object.keys(this.props.glucose).map(function (date) {

          return {
            date: new Date(date),
            count: this.props.glucose[date][mealType].glucose
          };
        }.bind(this));
      }
      return;
    },

    render: function() {
        var glucoseData = this.parseGlucoseData("breakfast");

        var margin = {top: 5, right: 50, bottom: 20, left: 50},
            w = this.state.width - (margin.left + margin.right),
            h = this.props.height - (margin.top + margin.bottom);

        var x = d3.time.scale()
            .domain(d3.extent(glucoseData, function (d) {
                return d.date;
            }))
            .rangeRound([0, w]);

        var y = d3.scale.linear()
            .domain(
              [
                d3.min(glucoseData,
                  function(d){
                    return d.count-10;
                }),
                d3.max(glucoseData,
                  function(d){
                    return d.count+10;
              })]
            )
            .range([h, 0]);

        var line = d3.svg.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.count);
            }).interpolate('cardinal');

        var transform='translate(' + margin.left + ',' + margin.top + ')';

        return (
          <div>
            <svg
              id={this.props.chartId}
              width={this.state.width}
              height={this.props.height}>
              <g transform={transform}>
                  <path
                    className="line shadow"
                    d={line(glucoseData)}
                    strokeLinecap="round"/>
                  <Dots
                    data={glucoseData}
                    x={x}
                    y={y}
                    showToolTip={this.showToolTip}
                    hideToolTip={this.hideToolTip}/>
              </g>
            </svg>
          </div>
        );
    }
});


module.exports = LineChart;
