var React = require('react');

var LogDetail = React.createClass({
  getInitialState: function() {
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

  buttonGlyph: function(){
    if (this.state.showDetail) {
      return "glyphicon glyphicon-chevron-up";
    } else {
      return "glyphicon glyphicon-chevron-down";
    }
  },

  data: function() {
    var elements = Object.keys(this.props.log).map(function (meal_type) {
      var meal = meal_type;
      meal = meal[0].toUpperCase() + meal.slice(1);

      return (
        <tr className="log-table-row" key={meal}>
          <td>{meal}</td>
          <td>{this.props.log[meal_type]["glucose"]+" units"}</td>
          <td>{this.props.log[meal_type]["carbs"]+" g"}</td>
        </tr>
      );
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
            <h4 className="log-heading">{this.props.date}</h4>
            <button
              className="btn btn-default panel-toggle"
              onClick={this.togglePanel}>
              <span className={this.buttonGlyph()} aria-hidden="true"></span>
            </button>
          </div>
        </div>
        <div key="body" className={this.panelBodyClass()}>
          <table className="table log-table">
            <thead>
              <tr key="header">
                <th key="mealType">Before Meal</th>
                <th key="glucose">Glucose</th>
                <th key="carbs">Carbs Eaten</th>
              </tr>
            </thead>
            {this.data()}
          </table>
        </div>
      </div>
    );
  }

});

module.exports = LogDetail;
