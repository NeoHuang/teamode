/**
 * UserController
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
   * (specific to UserController)
   */
  _config: { 
  	blueprints: {
  	rest: process.env.NODE_ENV == 'development',
  	actions: process.env.NODE_ENV == 'development' 
  }},

  signup: function (req, res){
  	if (req.method == "GET"){
	  	res.view();
  	}
  	else {
  		res.forbidden('Todo');
  	}
  },

  login: function (req, res){
  	res.forbidden('Todo');
  }

	 	 
};
