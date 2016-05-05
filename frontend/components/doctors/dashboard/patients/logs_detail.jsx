var React = require('react');
var Collapse = require('react-bootstrap/lib/Collapse');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Popover = require('react-bootstrap/lib/Popover');

var LogDetail = React.createClass({
  getInitialState: function() {
    if (this.props.index === 0) {
      return( {showDetail: true} );
    }
    return( {showDetail: false} );
  },

  componentDidMount: function() {
    if (this.props.index === 0) {
      return( {showDetail: true} );
    }
    return( {showDetail: false} );
  },

  panelBodyClass: function(){
    if (this.state.showDetail) {
      return "panel-body";
    } else {
      return "panel-body log-body-inactive";
    }
  },

  panelHeaderClass: function(){
    if (this.state.showDetail) {
      return "panel-heading log-heading-active";
    } else {
      return "panel-heading";
    }
  },

  headerClass: function(){
    if (this.state.showDetail) {
      return "log-heading log-selected";
    } else {
      return "log-heading";
    }
  },

  buttonGlyph: function(){
    if (this.state.showDetail) {
      return "glyphicon glyphicon-triangle-top";
    } else {
      return "glyphicon glyphicon-triangle-bottom";
    }
  },

  buttonClass: function() {
    if (this.state.showDetail) {
      return "btn panel-toggle panel-toggle-active";
    } else {
      return "btn panel-toggle";
    }
  },

  parseCarbs: function (carbData) {
    if (carbData) {
      return carbData+" g";
    } else {
      return "--";
    }
  },

  data: function() {
    var elements = ["breakfast", "lunch", "dinner"].map(function (meal_type) {
      if (this.props.log[meal_type]) {
        var meal = meal_type;
        meal = meal[0].toUpperCase() + meal.slice(1);

        return (
          <OverlayTrigger
            key={meal}
            trigger="click"
            rootClose
            placement="left"
            overlay={
              <Popover title="Comments">
                  <p>{this.props.log[meal_type]["comment"]}</p>
              </Popover>}>
            <tr className="log-table-row" key={meal}>
              <td>{meal}</td>
              <td>{this.props.log[meal_type]["glucose"]+" units"}</td>
              <td>{this.parseCarbs(this.props.log[meal_type]["carbs"])}</td>
            </tr>
          </OverlayTrigger>
        );
      } else {
        return;
      }
    }.bind(this));

    return (
      <tbody>
        {elements}
      </tbody>
    );
  },

  togglePanel: function() {
    if (this.state.showDetail) {
      this.setState({ showDetail: false });
    } else {
      this.setState({ showDetail: true });
    }
  },

  render: function() {
    return (
      <div key={this.props.date} className="panel panel-default date-panel">
        <div key="heading" className={this.panelHeaderClass()}>
          <div className="row">
            <h4 className={this.headerClass()}>{this.props.date}</h4>
            <button
              className={this.buttonClass()}
              onClick={this.togglePanel}>
              <span className={this.buttonGlyph()} aria-hidden="true"></span>
            </button>
          </div>
        </div>
        <Collapse in={this.state.showDetail}>
          <div>

            <div key="body" className={this.panelBodyClass()}>
              <table className="table log-table">
                <thead>
                  <tr key="header">
                    <th key="mealType">Before Meal</th>
                    <th key="glucose">Glucose</th>
                    <th key="carbs">Carbs</th>
                  </tr>
                </thead>
                {this.data()}
              </table>
            </div>

          </div>
        </Collapse>
      </div>
    );
  }

});

module.exports = LogDetail;
