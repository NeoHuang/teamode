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
  }, 

  add: function(newBoard){
  	if (newBoard.name && 
  		newBoard.ownerId){
  		return when.promise(function(resolve, reject, notify){
	      Board.create(newBoard).done(function(error, board) { 
        if (error){
          sails.log.error(JSON.stringify(error));
          reject({error: 500, message: "DB error"});
        }
        else {
          sails.log.info("new board:" + board.newBoard + " created")
          resolve(board);
        }
      });
    });
  	}
  	else {
  		return when.reject({error: 500, message: "invalid format"});
  	}
  }



};
