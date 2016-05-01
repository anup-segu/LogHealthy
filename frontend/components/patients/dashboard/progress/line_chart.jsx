var React = require('react');
var d3 = require('d3');
var resizeMixin = require('../../../../mixins/resize.js');

var Dots = require('./dots.jsx');
var Axis = require('./axis.jsx');
var Grid = require('./grid.jsx');
var ToolTip = require('./tool_tip.jsx');

var LineChart=React.createClass({
    propTypes: {
        width:React.PropTypes.number,
        height:React.PropTypes.number,
        chartId:React.PropTypes.string
    },

    mixins: [resizeMixin],

    getDefaultProps: function() {
        return {
            width: $(window).width()*.6,
            height: $(window).width()*.4,
            chartId: 'v1_chart'
        };
    },

    getInitialState: function() {
      return {
        tooltip:{ display: false, data: { key:'', value:'' } },
        width: this.props.width
      };
    },

    showToolTip:function(e){
    e.target.setAttribute('fill', '#FFFFFF');

    this.setState(
      { tooltip:
        { display:true,

          data: {
            key:e.target.getAttribute('data-key'),
            value:e.target.getAttribute('data-value')
          },

          pos: {
            x:e.target.getAttribute('cx'),
            y:e.target.getAttribute('cy')
          }

        }
      });
    },

    hideToolTip: function (event) {
      event.target.setAttribute('fill', '#7dc7f4');
      this.setState(
        { tooltip:
          { display: false,
            data: {
              key:'',
              value:''
            }
          }
      });
    },

    yAxis: function (y) {
      return (
        d3.svg.axis()
          .scale(y)
          .orient('left')
          .ticks(5)
      );
    },

    xAxis: function (data, x) {
      return (
        d3.svg.axis()
         .scale(x)
         .orient('bottom')
         .tickValues(data.map(function (d, i) {
             if (i>0) {
               return d.date;
             }
         }).splice(1))
         .ticks(4)
      );
    },

    yGrid: function (y, w) {
      d3.svg.axis()
        .scale(y)
        .orient('left')
        .ticks(5)
        .tickSize(-w, 0, 0)
        .tickFormat("");
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

        var horizontalAxis = this.xAxis(glucoseData, x);

        var verticalAxis = this.yAxis(y);

        var verticalGrid = this.yGrid(y, w);

        return (
          <div className="chart-container">
            <svg
              id={this.props.chartId}
              width={this.state.width}
              height={this.props.height}>
              <g transform={transform}>
                <Grid h={h} grid={verticalGrid} gridType="y"/>
                <Axis h={h} axis={verticalAxis} axisType="y" />
                <Axis h={h} axis={horizontalAxis} axisType="x"/>
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

                 <ToolTip tooltip={this.state.tooltip}/>
              </g>
            </svg>
          </div>
        );
    }
});


module.exports = LineChart;
