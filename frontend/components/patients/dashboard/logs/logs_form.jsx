var React = require('react');
var Modal = require("react-modal");
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Popover = require('react-bootstrap/lib/Popover');

var LogStore = require('../../../../stores/log_store.js');

var style = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  content: {
    width: '50%',
    marginTop: '5%',
    marginLeft: "25%",
    maxHeight: '600px'
  }
};


var LogForm = React.createClass({
  getInitialState: function() {
    return { modalOpen: false };
  },

  componentDidMount: function() {
    this.logListener = LogStore.addListener(this._toggleForm);
  },

  _toggleForm: function() {
    this.setState({ modalOpen: LogStore.modalState()});
  },

  closeModal: function() {
    if (this.state.modalOpen) {
      this.setState({ modalOpen: false });
    }
  },

  handleMealSelect: function (event) {
    event.preventDefault();
    alert(event.target.textContent.toLowerCase());
  },

  handleMealTaken: function (event) {
    event.preventDefault();
    alert(event.target.textContent.toLowerCase());
  },

  handleSubmit: function (event) {
    event.preventDefault();
    alert("submitted");
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
              placeholder="Ex. 150" />
            <span className="input-group-addon"> mg/dL (units)</span>
          </div>
          <p className="help-block">Enter your current reading before a meal as just a number.</p>
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
                placeholder="Ex. 20" />
            </OverlayTrigger>
            <span className="input-group-addon"> grams</span>
          </div>
          <p className="help-block">Enter your expected carb intake for this meal.</p>
        </div>

        <div className="form-group">
          <label>What meal would this be for?</label>
          <div className="input-group log-btn-group">
            <div
              className="btn-group log-btn-group">
              <button
                className="btn btn-default meal-btn"
                onClick={this.handleMealSelect}>Breakfast</button>
              <button
                className="btn btn-default meal-btn"
                onClick={this.handleMealSelect}>Lunch</button>
              <button
                className="btn btn-default meal-btn"
                onClick={this.handleMealSelect}>Dinner</button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Did you take a meal?</label>
          <div className="input-group log-btn-group">
            <div className="btn-group log-btn-group">
              <button
                className="btn btn-default meal-taken-btn"
                onClick={this.handleMealTaken}>Yes</button>
              <button
                className="btn btn-default meal-taken-btn"
                onClick={this.handleMealTaken}>No</button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Comments (optional)</label>
          <textarea className="form-control"></textarea>
          <p className="help-block">Feel free to detail your meal or any notable symptoms.</p>
        </div>

        <button className="btn btn-primary">Record Log</button>

      </form>
    );
  },

  render: function() {
    return (
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={style}>
          <h3>Create A New Log</h3>
          {this.form()}
        </Modal>
    );
  }

});

module.exports = LogForm;
