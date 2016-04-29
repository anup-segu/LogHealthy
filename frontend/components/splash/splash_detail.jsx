var React = require('react');

var SplashDetail = React.createClass({
  getInitialState: function() {
    return {
      patientProduct: true,
      doctorProduct: false
    };
  },

  moveToPatient: function() {
    if (!this.state.patientProduct) {
      this.setState({
        patientProduct: true,
        doctorProduct: false
      });
    }
  },

  moveToDoctor: function() {
    if (!this.state.doctorProduct) {
      this.setState({
        patientProduct: false,
        doctorProduct: true
      });
    }
  },

  patientButtonClass: function() {
    if (this.state.patientProduct) {
      return "btn btn-primary active";
    } else {
      return "btn btn-default";
    }
  },

  doctorButtonClass: function() {
    if (this.state.doctorProduct) {
      return "btn btn-primary active";
    } else {
      return "btn btn-default";
    }
  },

  patientProductPos: "center",

  patientProductClass: function() {
    if (this.state.patientProduct && this.patientProductPos === "left") {
      this.patientProductPos = "center";
      return "container-fluid row splash-patient product-move-right";
    } else if (this.state.patientProduct) {
      return "container-fluid row splash-patient";
    } else {
      this.patientProductPos = "left";
      return "container-fluid row splash-patient product-move-left";
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
              <p>No more paper logs - ever. Plus, you keep your doctor in the loop too.</p>
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
        <div className="doctor-test">
          <div className="doctor-sub-test-1">
            <div className="thumbnail about-thumbnail">
              <div className="container about-icon">
                <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
              </div>
              <div className="caption">
                <h4>Instantly Follow Your Patients Progress.</h4>
                <p>Follow their progress and quickly spot patterns to optimize treatment.</p>
              </div>
            </div>
          </div>
          <div className="doctor-sub-test-2">
            <div className="thumbnail about-thumbnail">
              <div className="container about-icon">
                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
              </div>
              <div className="caption">
                <h4>Update Insulin Treatment In Realtime.</h4>
                <p>Dynamic tools available to update patient's treatment and provide personalized attention.</p>
              </div>
            </div>
          </div>
          <div className="doctor-sub-test-3">
            <div className="thumbnail about-thumbnail">
              <div className="container about-icon">
                <span className="glyphicon glyphicon-envelope" aria-hidden="true"></span>
              </div>
              <div className="caption">
                <h4>Contact And Respond To Patients Seamlessly.</h4>
                <p>Convenient options to communicate with your patients. Forget the rolodex. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  doctorAbout: function() {
    return(
      <div className="row text-center">
        <div className="col-sm-4 col-md-4">
          <div className="thumbnail about-thumbnail">
            <div className="container about-icon">
              <span className="glyphicon glyphicon-cloud-upload" aria-hidden="true"></span>
            </div>
            <div className="caption">
              <h4>Track Your Glucose in One Location.</h4>
              <p>No more paper logs - ever. Plus, you keep your doctor in the loop too.</p>
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
        <div className={this.patientProductClass()}>
          {this.patientAbout()}
        </div>

        <div className="container text-center">
          <div className="btn-group" role="group" aria-label="...">
            <button
              className={this.patientButtonClass()}
              onClick={this.moveToPatient}>
              For Patients
            </button>
            <button
              className={this.doctorButtonClass()}
              onClick={this.moveToDoctor}>
              For Doctors
            </button>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = SplashDetail;
