/**
 * Token
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var when = require('when');

module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
  	username: {
  		type: 'string'

  	},

  	userhash: {
  		type: 'string'
  	},

  	token: {
  		type: 'string'
  	}
    
  },

  validateToken: function(userhash, tokenhash){
  	return when.promise(function(resolve, reject, notify){
  		Token.findOneByUserhash(userhash, function(err, token){
			if (err){
				reject(err);
			}
			else if (token){
				if (token.token == tokenhash){
					User.checkNameExist(token.username).done(function(usr){
						resolve(usr);
					}, function(err){
						reject(err);
					});

				}
				else {
					reject({error: 500, message: "token not match"});
				}
			}
			else {
				reject({error:500, message: "token not exist"});
			}
		});
  });
  }

};
