var UserService = require('../services/UserService');
module.exports = {

	index: function(req, res){
		var user = req.user;

		var username = user.firstName + " " + user.lastName;
		res.view('home/dashboard', {layout: "dashboardLayout", username: username});

	}
	
}