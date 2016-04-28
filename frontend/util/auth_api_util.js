var AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
  post: function(request){
    $.ajax({
      url: 'api/session',
      method: "get",
      user: request.user,
      success: request.success,
      error: request.error
    });
  },
};
