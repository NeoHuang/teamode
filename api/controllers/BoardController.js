/**
 * BoardController
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
var errors = require('../services/errors');
 module.exports = {




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to BoardController)
   */
   _config: {},

   list: function(req, res){
	if (req.session.user){
		Board.listByUser(req.session.user.id).then(function(boards){
			res.json(boards);
		}, function(error){
			res.json(error);
		})
	}
	else {
		res.json(errors.errLoginRequired);

	}

   },

   add: function(req, res){
   	if (req.session.user){
   		var newBoard = {
   			name: req.param('name'),
   			description: req.param('description'),
   			ownerId: req.session.user.id
   		}

   		Board.add(newBoard).then(function(board){
   			res.json(board);
   		}, function(error){
   			res.json(error);
   		})
   	}
   	else {
		res.json(errors.errLoginRequired);
   	}

   }
};
