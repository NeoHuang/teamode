/**
 * ListController
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

var UserService = require('../services/UserService')
var errors = require('../services/errors');
module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ListController)
   */
  _config: {},

  add: function(req, res){
  	UserService.getCurrentUser(req, function(user){

  		if (user){
  			var newList = {
  				name:req.param("name"),
  				boardId: req.param("boardId")
  			}
  			if (newList.name && newList.boardId){
	  			if (user.canAddList(newList.boardId)){
	  				newList.status = 0;
	  				List.findByBoardId(newList.boardId).done(function(err, lists){
	  					if (err){
	  						res.json(errors.errDb);
	  					}
	  					else {
	  						newList.order = lists.length;
	  						List.create(newList).done(function(err, addedList){
	  							if (err){
	  								res.json(errors.errDb);
	  							}
	  							else {
	  								res.json(addedList);
	  							}
	  						})
	  					}

	  				})
	  			}
	  			else {
	  				res.json(errors.errNotAllowed);
	  			}
  			}
  			else {
  				res.json(errors.errInvalidFormat);
  			}

  		}
  		else {
  			res.json(errors.errLoginRequired)
  		}
  	})


  }




  
};
