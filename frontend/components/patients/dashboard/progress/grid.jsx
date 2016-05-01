var React = require('react');
var d3 = require('d3');
var ReactDOM = require('react-dom');

var Grid = React.createClass({
  propTypes: {
    h: React.PropTypes.number,
    grid: React.PropTypes.func,
    gridType: React.PropTypes.oneOf(['x', 'y'])
  },

  renderGrid: function() {
    var node = ReactDOM.findDOMNode(this);
    d3.select(node, this.props.grid);
    // d3.select(node).call(this.props.grid);
  },

  componentDidMount: function() {
    this.renderGrid();
  },

  componentDidUpdate: function() {
    this.renderGrid();
  },

  render: function() {
    var translate = "translate(0,"+(this.props.h)+")";
    return (
        <g className="y-grid"
          transform={this.props.gridType === 'x'? translate : ""}>
        </g>
    );
  }
});

module.exports = Grid;
