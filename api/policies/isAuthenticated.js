/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
'use strict';

module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
	var UserService = require('../services/UserService');

	 UserService.getCurrentUser(req, res, function(user){
      if (user){
      	req.user = user;
      	return next();
      }
      else {
      	if(/application\/json/.test(req.get('accept'))){
      		return res.json(errors.errLoginRequired);
      	}
      	else {
      		return res.redirect('/login');

      	}
      }
    });
  // if (req.session.authenticated) {
  //   return next();
  // }

  // // User is not allowed
  // // (default res.forbidden() behavior can be overridden in `config/403.js`)
  // return res.forbidden('You are not permitted to perform this action.');
};
