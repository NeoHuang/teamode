/**
 * List
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
  	name: 'string',
  	boardId: 'integer',
  	order: 'integer',
  	status: 'integer'//0: normal, 1: archived

  },

  add: function(newList){
    newList.status = 0;
    when.promise(function(resolve, reject){
      List.findByBoardId(newList.boardId).done(function(err, lists){
        if (err){
          reject(errors.errDb);
        }
        else {
          newList.order = lists.length;
          List.create(newList).done(function(err, addedList){
            if (err){
              reject(errors.errDb);
            }
            else {
              resolve(addedList);
            }
          });
        }

      });


    });
  }


};
