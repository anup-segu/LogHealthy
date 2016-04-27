var React = require('react');

var SplashBody = React.createClass({

  render: function() {
    return (
      <div className="container-fluid splash-body">
        <div className="blockout"></div>
        <div className="container">
          <h1 className="text-center headline">Content Here</h1>
          <h4 className="text-center headline">Taglines Here</h4>
        </div>
      </div>
    );
  }

});

module.exports = SplashBody;
