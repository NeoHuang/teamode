/**
 * Board
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
    name: {
    	type: 'string',
    	maxLength: 20,
    	minLength: 3,
    	required:true
    },

    description: {
    	type: 'string',
    	maxLength: 255
    },

    ownerId: {
    	type: 'integer',
    	required: true
    }



  },

  listByUser: function(id){
  	return when.promise(function(resolve, reject, notify){
   		Board.findByOwnerId(id).done(function(err, boards){
   			if (err){
   				reject({error: 500, message: 'DB Error'});
   			}
   			else {
   				resolve(boards);
   			}
   		});
  	})
  }



};
