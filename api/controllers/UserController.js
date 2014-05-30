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

 var when = require('when');

 var checkNameNotExist = function(username){
    return when.promise(function(resolve, reject, notify) {
    User.findOneByUsername(username).done(function(err, usr){
      if (err){
        sails.log.error(error);
        reject("DB Error");
      } else if (usr){
        sails.log.error(username + " exist");
        reject("user exist");
      } else {
        resolve();
      }
    });
  });

};

var checkEmailNotExist = function(email){
  return when.promise(function(resolve, reject, notify) {
    User.findOneByEmail(email).done(function(err, usr){
      if (err){
        sails.log.error(error);
        reject("DB Error");
      } else if (usr){
        sails.log.error(email + " exist");
        reject("email exist");
      } else {
        resolve();
      }
    });
  });

};

var createNewUser = function(newUser){
  var hasher = require("password-hash");
  newUser.password = hasher.generate(newUser.password);
  return when.promise(function(resolve, reject, notify){
    User.create(newUser).done(function(error, user) { 
      if (error){
        sails.log.error(JSON.stringify(error));
        reject("DB error");
      }
      else {
        sails.log.info("user:" + user.username + " created")
        resolve(user);
      }
    });
  });
};

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
      else if (req.method == "POST"){
        var newUser = {
          username: req.param("username"),
          password: req.param('password'),
          email: req.param('email'),
          firstName: req.param('firstName'),
          lastName: req.param('lastName')
        }
        if (newUser.username && 
          newUser.password &&
          newUser.email){
          newUser.username = newUser.username.toLowerCase();
          if (!(/^[a-z0-9_-]{3,20}$/.test(newUser.username))){
            sails.log.error("username:" + newUser.username + " format not correct");
            res.json({error: "invalid username format"});
            return;
          }  
          if (!(/^.{6,20}$/.test(newUser.password))){
            sails.log.error("password:" + newUser.password + " format not correct");
            res.json({error: "invalid password format"});
            return;
          }  

          checkNameNotExist(newUser.username)
        .then (function() {
          return checkEmailNotExist(newUser.email);
        })
        .then(function(){
          return createNewUser(newUser)
        })
        .done(function(user){
          delete user.password;
          req.session.user = user;
          res.json(user);
        }, function(error){
          res.json({error: error}) ;
        });

      }
      else {
        sails.log.error("required information not complete " + JSON.stringify(newUser));
        res.json({error:"required information not complete"});
      }
    }
    else {
        res.forbidden("Not supported");
    }
  },


  login: function (req, res){
    var reqUser = {
      username:req.param("username"),
      password: req.param("password")
    }

    if (reqUser.username && 
        reqUser.password){
      reqUser.username = reqUser.username.toLowerCase();
      User.findOneByUsername(reqUser.username).done(function(err, user){
        if (err){
          res.json({error: "DB Error"});
        } else if (user === undefined){
          res.json({error: "user not exist"});
        }
        else {
          var hasher = require("password-hash");
          if (hasher.verify(reqUser.password, user.password)){
            delete user.password;
            req.session.user = user;
            res.json(user);
          }
          else {
            res.json({error: "password not correct"});
          }
        }
      })
    }
    else {
      res.json({error: "please input username and password"});
    }
 },

 getLogin: function(req, res){
    if (req.session.user){
      res.redirect('/', 301);
    }
    else {
      res.view('user/login');
    }

 },

 logout: function (req, res){
    req.session.destroy(function(){
      res.redirect('/', 301);
    });
 }


};
