/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	username: {
  		type: 'string',
  		maxLength: 20,
  		minLength: 3,
  		required: true
  	},

  	firstname: {
  		type: 'string',
  		maxLength: 20,
  		minLength: 3,
  	},

  	lastname: {
  		type: 'string',
  		maxLength: 20,
  		minLength: 3,
  	},
  	
  	password: {
  		type: 'string',
  	},

  	email: {
  		type:'email',
  		required: true
  	}

  	/* e.g.
  	nickname: 'string'
  	*/
    
  }

};
