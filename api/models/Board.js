/**
 * Board
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

 'use strict';
var when = require('when');
var errors = require('../services/errors');
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
  	return when.promise(function(resolve, reject){
   		Board.findByOwnerId(id).done(function(err, boards){
   			if (err){
          sails.log.error('db error' + JSON.stringify(err));
   				reject(errors.errDb);
   			}
   			else {
   				resolve(boards);
   			}
   		});
  	});
  }, 

  add: function(newBoard){
  	if (newBoard.name && 
  		newBoard.ownerId){
  		return when.promise(function(resolve, reject){
	      Board.create(newBoard).done(function(error, board) { 
        if (error){
          sails.log.error(JSON.stringify(error));
          reject(errors.errDb);
        }
        else {
          sails.log.info('new board:' + board.newBoard + ' created');
          resolve(board);
        }
      });
    });
  	}
  	else {
  		return when.reject({error: 500, message: 'invalid format'});
  	}
  }



};
