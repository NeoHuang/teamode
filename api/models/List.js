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
    return when.promise(function(resolve, reject){
      List.findByBoardId(newList.boardId).done(function(err, lists){
        if (err){
          reject(errors.errDb);
        }
        else {
          var largestOrder = -1;
          lists.forEach(function(i){
            if (i.order > largestOrder){
              largestOrder = i.order;
            }
          });
          newList.order = largestOrder + 1;
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
  },

  isInSameBoard: function(listArray){
      var promises = listArray.map(function(listId){
        return when.promise(function(resolve, reject){
          List.findOne(listId).done(function(err, list){
            if (err){
              reject();
            }else if (!list){
              reject();
            }
            else {
              resolve(list);
            }
          });
        });
      });

      return when.promise(function(resolve, reject){
        when.all(promises).done(function(lists){
          var same = true;
          for (var i = 1; i < lists.length; i++){
            if (lists[i].boardId != lists[0].boardId){
              same = false;
              break;
            }
          }
          if (same){
            resolve();
          }
          else {
            reject();
          }

        }, function(){
          reject();
        });

      });

  }


};
