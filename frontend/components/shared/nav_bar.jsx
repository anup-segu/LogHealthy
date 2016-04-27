var React = require('react');
var hashHistory = require('react-router').hashHistory;

module.exports = React.createClass({
  redirect: function() {
    hashHistory.push("/");
  },

  logo: function() {
    return (
      <div className="navbar-header">
        <a href="#" onClick={this.redirect}>
          <img
            src="http://i.imgur.com/yVQrigv.png?1"
            className="logo" />
        </a>
      </div>
    );
  },

  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          {this.logo()}
        </div>
      </nav>
    );
  }
});

// ../../../app/assets/images/logo.png
