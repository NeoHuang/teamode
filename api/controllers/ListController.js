/**
 * ListController
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
 'use strict';

var when = require('when');
 var errors = require('../services/errors');
 module.exports = {




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ListController)
   */
   _config: {},

   add: function(req, res){
    var user = req.user;
    var newList = {
      name:req.param('name'),
      boardId: req.param('boardId')
    };
    if (newList.name && newList.boardId){
      if (user.canAddList(newList.boardId)){
        newList.status = 0;
        List.findByBoardId(newList.boardId).done(function(err, lists){
          if (err){
            res.json(errors.errDb);
          }
          else {
            newList.order = lists.length;
            List.create(newList).done(function(err, addedList){
              if (err){
                res.json(errors.errDb);
              }
              else {
                res.json(addedList);
              }
            });
          }

        });
      }
      else {
       res.json(errors.errNotAllowed);
     }
   }
   else {
    res.json(errors.errInvalidFormat);
  }
},

changeOrder: function(req, res){
  var order = req.param('order').split(',').map(function(e){
    return parseInt(e);
  });
  var orderData = {
    boardId: req.param('boardId'),
    order: order
  };
  if (orderData.boardId && orderData.order){
    Board.getLists(orderData.boardId).done(function(lists){
      var sortedOrder = orderData.order.slice(0);
      sortedOrder.sort();
      var sortedList = lists.map(function(l){
        return l.id;
      }).sort();

      if (JSON.stringify(sortedOrder) != JSON.stringify(sortedList)){
        res.json(errors.errInvalidData);

      }
      else {
        var promises = [];
        orderData.order.forEach(function(o, oi){
          lists.forEach(function(l, li){
            if (o === l.id &&
              oi !== l.order){
              lists[li].order = oi;
              lists[li].changed = true;
            }
          });
        });

        lists.forEach(function(list){
          if (list.changed === true){
            promises.push(when.promise(function(resolve, reject){
              list.save(function(err){
                if (err){
                  reject();
                }
                else {
                  resolve();
                }
              });
            }));
          }
        });

        when.all(promises).done(function(){
          res.json({status: 200});
        }, function(){
          res.json(errors.errDb);
        });

      }

    }, function(){
      res.json(errors.errDb);

    });
  }
  else {
    res.json(errors.errInvalidFormat);
  }
}






};
