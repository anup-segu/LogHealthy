var React = require('react');

var AuthActions = require('../../actions/auth_actions.js');

var SplashBody = React.createClass({
  openCreateModal: function(){
    AuthActions.openCreateForm();
  },

  getStartedButton: function() {
    return <button
      className="btn btn-default btn-lg start-landing splash-button"
      onClick={this.openCreateModal}>Get Started Now</button>;
  },

  getStartedLearn: function() {
    return <button
      className="btn btn-default btn-lg start-learn splash-button">Learn More</button>;
  },

  splashLanding: function() {
    return (
      <div>
        <div className="blockout blockout-space"></div>
        <div className="container">
          <h1 className="text-center headline">Content Here</h1>
          <h4 className="text-center headline">Taglines Here</h4>
          <div className="blockout blockout-small"></div>
          <div className="container-fluid">{this.getStartedButton()}</div>
          <div className="blockout blockout-small"></div>
          <div className="container-fluid">{this.getStartedLearn()}</div>
        </div>
      </div>
    );
  },

  render: function() {
    return (
      <div className="container-fluid splash-body">
        {this.splashLanding()}
      </div>
    );
  }

});

module.exports = SplashBody;
