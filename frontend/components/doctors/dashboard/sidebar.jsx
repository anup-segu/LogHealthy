var React = require('react');
var PropTypes = React.PropTypes;

var Sidebar = React.createClass({

  render: function() {
    return (
      <div className="container sidebar">
        <div className="container sidebar-content">
          <ul className="list-unstyled">
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = Sidebar;
