module.exports = {

	index: function(req, res){
		if (req.session.user){
			res.view();
		}
		else {
			res.send(404, "todo");
		}
	}
	
}