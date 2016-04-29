var React = require('react');

var SplashDetail = React.createClass({
  getInitialState: function() {
    return {
      patientClass: "btn btn-primary active",
      doctorClass: "btn btn-default"
    };
  },

  patientAnimation: function() {
    if (this.state.doctorClass === "btn btn-default") {
      return "container-fluid product-move-left";
    } else {
      return "container-fluid";
    }
  },

  toggleAbout: function() {
    if (this.state.patientClass === "btn btn-primary active") {
      this.setState({
        patientClass: "btn btn-default",
        doctorClass: "btn btn-primary active"
      });
    } else {
      this.setState({
        patientClass: "btn btn-primary active",
        doctorClass: "btn btn-default"
      });
    }
  },

  patientAbout: function() {
    return(
      <div className="row text-center">
        <div className="col-sm-4 col-md-4">
          <div className="thumbnail about-thumbnail">
            <div className="container about-icon">
              <span className="glyphicon glyphicon-cloud-upload" aria-hidden="true"></span>
            </div>
            <div className="caption">
              <h4>Track Your Glucose in One Location.</h4>
              <p>No more paper logs - ever. While keeping your doctor in the loop too.</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 col-md-4">
          <div className="thumbnail about-thumbnail">
            <div className="container about-icon">
              <span className="glyphicon glyphicon-stats" aria-hidden="true"></span>
            </div>
            <div className="caption">
              <h4>Visualize and Optimize Your Treatment.</h4>
              <p>Identify trends in your treatment faster with our visualization tools.</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 col-md-4">
          <div className="thumbnail about-thumbnail">
            <div className="container about-icon">
              <span className="glyphicon glyphicon-comment" aria-hidden="true"></span>
            </div>
            <div className="caption">
              <h4>Communicate With Your Doctor.</h4>
              <p>Messaging platform to connect with the experts whenever you need it.</p>
            </div>
          </div>
        </div>
      </div>
    );
  },

  render: function() {
    return (
      <div className="splash-detail">
        <div className={this.patientAnimation()}>
          {this.patientAbout()}
        </div>
        <div className="container text-center">
          <div className="btn-group" role="group" aria-label="...">
            <button
              className={this.state.patientClass}
              onClick={this.toggleAbout}>
              For Patients
            </button>
            <button
              className={this.state.doctorClass}
              onClick={this.toggleAbout}>
              For Doctors
            </button>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = SplashDetail;
