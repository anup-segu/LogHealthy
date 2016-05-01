var React = require('react');
var d3 = require('d3');

var Dots = React.createClass({
    propTypes: {
        data: React.PropTypes.array,
        x: React.PropTypes.func,
        y: React.PropTypes.func
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
            r="7"
            cx={_self.props.x(d.date)}
            cy={_self.props.y(d.count)}
            fill="#7dc7f4"
            stroke="#3f5175"
            strokeWidth="5px"
            key={i}></circle>
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
