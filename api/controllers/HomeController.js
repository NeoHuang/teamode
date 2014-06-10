var UserService = require('../services/UserService');
module.exports = {

	index: function(req, res){

		UserService.getCurrentUser(req,function(user){
			if (user){
				var username = user.firstName + " " + user.lastName;
				res.view('home/dashboard', {layout: "dashboardLayout", username: username});
			}
			else {
				res.redirect('/login');
			}

		});

	}
	
}