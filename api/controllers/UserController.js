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


var when = require('when') ;
var crypto = require('crypto');
var cookieService = require('../services/UserService');
module.exports = {




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
   _config: { 
     // blueprints: {
     //   rest: process.env.NODE_ENV == 'development',
     //   actions: process.env.NODE_ENV == 'development' 
     // }
   },

     signup: function (req, res){
       if (req.method == "GET"){
        res.view();
      }
      else if (req.method == "POST"){
        var newUser = {
          username: req.param("username"),
          password: req.param('password'),
          email: req.param('email'),
          firstName: req.param('firstName'),
          lastName: req.param('lastName')
        }
        when(User.add(newUser)).then(function(user){
          delete user.password;
          req.session.user = user;
          res.json(user);

        }, function(error){
          res.json(error);
        });
    }
    else {
        res.forbidden("Not supported");
    }
  },


  login: function (req, res){
    var reqUser = {
      username:req.param("username"),
      password: req.param("password"),
      remember: req.param("remember")
    }
    when(User.check(reqUser)).then(function(user){
      delete user.password;
      req.session.user = user;
      sails.log.info("session" + JSON.stringify(req.session.user));
      if (reqUser.remember == true){
        cookieService.updateToken(user.username, res, function(){res.json(user)});
      }
      else 
        res.json(user);
    }, function(error){
      res.json(error);
    })

 },

 

 getLogin: function(req, res){
    if (req.session.user){
      res.redirect('/');
    }
    else {
      res.view('user/login');
    }

 },

 logout: function (req, res){
    delete req.session.user;
    res.clearCookie("tmdu");
    res.clearCookie("tmdt");
    res.json({status: "OK"});

 }


};
