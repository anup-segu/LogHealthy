var React = require('react');
var d3 = require('d3');

var Dots = React.createClass({
    propTypes: {
        data: React.PropTypes.array,
        x: React.PropTypes.func,
        y: React.PropTypes.func
    },

    getInitialState: function() {
      return {
        color: this.props.color,
        color2: this.props.color2,
      };
    },

    componentWillReceiveProps: function (newProps) {
      this.setState({
        color: newProps.color,
        color2: newProps.color2
      });
    },

    render: function() {
      var _self=this;

      //remove last & first point
      var data = this.props.data;
      // var data = this.props.data.splice(1);
      // data.pop();

      var circles = data.map(function (d,i) {
        return (
          <circle
            className="dot"
            r="5"
            cx={_self.props.x(d.date)}
            cy={_self.props.y(d.count)}
            fill={_self.state.color}
            stroke={_self.state.color2}
            strokeWidth="3px"
            key={i}
            onMouseOver={_self.props.showToolTip}
            onMouseOut={_self.props.hideToolTip}
            data-key={d3.time.format("%b %e")(d.date)}
            data-value={d.count}></circle>
        );
      });

      return(
        <g>
          {circles}
        </g>
      );
    }
});

module.exports = Dots;
