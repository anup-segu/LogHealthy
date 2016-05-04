var React = require('react');
var Modal = require("react-modal");
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Popover = require('react-bootstrap/lib/Popover');

var LogStore = require('../../../../stores/log_store.js');
var LogActions = require('../../../../actions/log_actions.js');

var style = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  content: {
    width: '55%',
    marginTop: '5%',
    marginLeft: "25%",
    maxHeight: '600px'
  }
};

var LogEditForm = React.createClass({
  getInitialState: function() {
    if (this.props.log["meal_taken?"]) {
      var meal_taken = "yes";
    } else {
      var meal_taken = "no";
    }

    return {
      modalOpen: false,
      errors: null,
      glucose: this.props.log.glucose,
      meal_type: this.props.log.meal_type,
      meal_taken: meal_taken,
      carbs: this.props.log.carbs,
      comment: this.props.log.comment
    };
  },

  componentDidMount: function() {
    this.logListener = LogStore.addListener(this._toggleForm);
  },

  componentWillUnmount: function() {
    this.logListener.remove();
  },

  _toggleForm: function() {
    this.setState({
      modalOpen: LogStore.modalEditState(this.props.log.id),
      errors: LogStore.editErrors()
    });
  },

  cancelLog: function() {
    LogActions.closeEditForm();
  },

  closeModal: function() {
    if (this.state.modalOpen) {
      this.setState({ modalOpen: false, errors: null });
    }
  },

  errors: function() {
    var self = this;
    if (this.state.errors) {
      return (
        <ul>
          {
            this.state.errors.map(function(error, i){
              return (<li key={i}>{error}</li>);
            })
          }
        </ul>
      );
    }
    return;
  },

  handleMealSelect: function (event) {
    event.preventDefault();
    this.setState({meal_type: event.target.textContent.toLowerCase()});
  },

  handleMealTaken: function (event) {
    event.preventDefault();
    if (event.target.textContent.toLowerCase() === "yes") {
      this.setState({meal_taken: "yes"});
    } else {
      this.setState({meal_taken: "no", carbs: ""});
    }
  },

  handleGlucose: function (event) {
    event.preventDefault();
    this.setState({glucose: event.target.value});
  },

  handleCarbs: function (event) {
    event.preventDefault();
    this.setState({carbs: event.target.value});
  },

  handleComment: function (event) {
    event.preventDefault();
    this.setState({comment: event.target.value});
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var parsedMealTaken;
    if (this.state.meal_taken === "yes") {
      parsedMealTaken = true;
    } else {
      parsedMealTaken = false;
    }
    var log = {
      id: this.props.log.id,
      glucose: this.state.glucose,
      carbs: this.state.carbs,
      meal_type: this.state.meal_type,
      "meal_taken?": parsedMealTaken,
      comment: this.state.comment
    };

    LogActions.patch(log);
  },

  breakfastMealTypeClass: function() {
    if (this.state.meal_type === "breakfast") {
      return "btn btn-selected-1 meal-btn";
    } else {
      return "btn btn-unselected meal-btn";
    }
  },

  lunchMealTypeClass: function() {
    if (this.state.meal_type === "lunch") {
      return "btn btn-selected-2 meal-btn";
    } else {
      return "btn btn-unselected meal-btn";
    }
  },

  dinnerMealTypeClass: function() {
    if (this.state.meal_type === "dinner") {
      return "btn btn-selected-3 meal-btn";
    } else {
      return "btn btn-unselected meal-btn";
    }
  },

  mealTakenClass: function() {
    if (this.state.meal_taken === "yes") {
      return "btn btn-selected-1 meal-taken-btn";
    } else {
      return "btn btn-unselected meal-taken-btn";
    }
  },

  mealNotTakenClass: function() {
    if (this.state.meal_taken === "no") {
      return "btn btn-selected-3 meal-taken-btn";
    } else {
      return "btn btn-unselected meal-taken-btn";
    }
  },

  carbsMessage: function() {
    if (this.state.meal_taken === "yes") {
      return "Enter your expected carb intake for this meal.";
    } else {
      return "No need to count carbs for this log.";
    }
  },

  carbsDisable: function() {
    if (this.state.meal_taken === "yes") {
      return "";
    } else {
      return "disabled";
    }
  },

  form: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="glucose_field">Glucose</label>
          <div className="input-group">
            <input
              type="input"
              className="form-control"
              id="glucose_field"
              defaultValue={this.props.log.glucose}
              onChange={this.handleGlucose}
              placeholder="Ex. 150" />
            <span className="input-group-addon"> mg/dL (units)</span>
          </div>
          <p className="help-block">Enter your current reading before a meal as just a number.</p>
        </div>

        <div className="form-group">
          <label>What meal would this be for?</label>
          <div className="input-group log-btn-group">
            <div
              className="btn-group log-btn-group">
              <button
                className={this.breakfastMealTypeClass()}
                onClick={this.handleMealSelect}>Breakfast</button>
              <button
                className={this.lunchMealTypeClass()}
                onClick={this.handleMealSelect}>Lunch</button>
              <button
                className={this.dinnerMealTypeClass()}
                onClick={this.handleMealSelect}>Dinner</button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Did you take a meal?</label>
          <div className="input-group log-btn-group">
            <div className="btn-group log-btn-group">
              <button
                className={this.mealTakenClass()}
                onClick={this.handleMealTaken}>Yes</button>
              <button
                className={this.mealNotTakenClass()}
                onClick={this.handleMealTaken}>No</button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="carbs_field">Carbs</label>
          <div className="input-group">
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="right"
              overlay={
                <Popover title="Need help counting carbs?">
                Visit <a
                  href="https://www.calorieking.com"
                  target="_blank">calorieking.com</a> htmlFor some helpful info.</Popover>
              }>
              <input
                type="input"
                className="form-control"
                id="carbs_field"
                defaultValue={this.props.log.carbs}
                onChange={this.handleCarbs}
                placeholder="Ex. 20" disabled={this.carbsDisable()}/>
            </OverlayTrigger>
            <span className="input-group-addon"> grams</span>
          </div>
          <p className="help-block">{this.carbsMessage()}</p>
        </div>

        <div className="form-group">
          <label>Comments (optional)</label>
          <textarea
            className="form-control"
            defaultValue={this.props.log.comment}
            onChange={this.handleComment}></textarea>
          <p className="help-block">Feel free to detail your meal or any notable symptoms.</p>
        </div>

        <button className="btn btn-submit-log">Update Log</button>
        <br/>
        <a className="cancel-link" onClick={this.cancelLog}>Go Back To Logs</a>
      </form>
    );
  },

  render: function() {
    return (
      <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.cancelLog}
        style={style}>
        <div className="log-form">
          <h3 className="log-form-header">Edit This Log</h3>
          {this.errors()}
          {this.form()}
        </div>
      </Modal>
    );
  }

});

module.exports = LogEditForm;
