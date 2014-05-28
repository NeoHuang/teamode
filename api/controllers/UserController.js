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
      var username = req.param("username");
      var password = req.param('password');
      var firstName = req.param('firstName');
      var lastName = req.param('lastName');
      var email = req.param('email');
      User.findByUsername(username).done(function(err, usr){
        if (err){
          res.send(500, {error: "DB Error"});
        } else if (usr.length > 0){
          console.log(usr);
          res.send(400, {error: "Username already Taken"});
        }
        else {
          var hasher = require("password-hash");
          password = hasher.generate(password);
          User.create({
            username: username,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName
          }).done(function(error, user) {
            if (error){
              console.log(error);
              res.send(500, {error: "DB Error" + error});
            }
            else {
              req.session.user = user;
              res.send(user);
            }
          })

        }

      })
  	}
  },

  login: function (req, res){
  	res.forbidden('Todo');
  }

	 	 
};
