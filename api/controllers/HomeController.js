var UserService = require('../services/UserService');
module.exports = {

	index: function(req, res){
		var user = req.user;

		res.view('home/dashboard', {layout: "dashboardLayout", user: user});

	}
	
}