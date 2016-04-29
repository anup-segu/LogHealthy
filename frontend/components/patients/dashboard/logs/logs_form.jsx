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


  form: function() {
    return (
      <form>
        <div className="form-group">
          <label for="glucose_field">Glucose</label>
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
          <label for="carbs_field">Carbs</label>
          <div className="input-group">
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="right"
              overlay={
                <Popover title="Need help counting carbs?">
                Visit <a
                  href="https://www.calorieking.com"
                  target="_blank">calorieking.com</a> for some helpful info.</Popover>
              }>
              <input
                type="input"
                className="form-control"
                id="carbs_field"
                placeholder="Ex. 20" />
            </OverlayTrigger>
            <span className="input-group-addon"> grams</span>
          </div>

          <div className="form-group">
            
          </div>
          <p className="help-block">Enter your expected carb intake for this meal.</p>
        </div>


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
