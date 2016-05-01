var ReactDOM = require('react-dom');

var resizeMixin = {
  componentWillMount: function() {
    var _self=this;

    $(window).on('resize', function (e) {
      _self.updateSize();
    });

    this.setState({width:this.props.width});
  },

  componentDidMount: function() {
    this.updateSize();
  },

  componentWillUnmount: function() {
    $(window).off('resize');
  },

  updateSize: function() {
    var node = ReactDOM.findDOMNode(this);
    var parentWidth = $(node).width();

    // if (parentWidth < this.props.width) {
      this.setState({width: parentWidth*.95});
    // } else {
    //   this.setState({width: this.props.width});
    // }
  }
};

module.exports = resizeMixin;
