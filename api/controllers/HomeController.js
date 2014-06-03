module.exports = {

	index: function(req, res){
		sails.log.info("getsession" + JSON.stringify(req.session.user));
		if (req.session.user){
			var username = req.session.user.firstName + " " + req.session.user.lastName;
			res.view('home/dashboard', {layout: "dashboardLayout", username: username});
		}
		else {
			res.redirect('/login');
		}
	}
	
}