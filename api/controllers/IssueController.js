/**
 * IssueController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to IssueController)
   */
  _config: {},

  add: function(req, res){
  	var user = req.user;
	    var newIssue = {
				summary: req.param('summary'),
				description: req.param('description'),
				creatorId: user.id,
				listId: req.param('listId'),
				point: req.param('point') || 0,
				severity: req.param('severity') || 0

      }
			Issue.add(newIssue).then(function(issue){
				res.json(issue);
			}, function(error){
				res.json(error);
			});
},

  
};
