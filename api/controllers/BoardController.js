/**
 * BoardController
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
 var UserService = require('../services/UserService');
 module.exports = {




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to BoardController)
   */
   _config: {},

   list: function(req, res){
      var user = req.user;
         Board.listByUser(user.id).then(function(boards){
            res.json(boards);
         }, function(error){
            res.json(error);
         });
   },

 show: function(req, res){
      var user = req.user;
      if (req.param('id')){
         Board.findOne(req.param('id')).done(function(err, board){
            if (!err){
              var username = user.firstName + ' ' + user.lastName;
               res.view('board/show', {layout: 'dashboardLayout', 
                  username: username, 
                  boardName: board.name,
                  boardId: board.id});

            }

         });
      }

},

add: function(req, res){
    var user = req.user;
       var newBoard = {
         name: req.param('name'),
         description: req.param('description'),
         ownerId: user.id
        };

        Board.add(newBoard).then(function(board){
           res.json(board);
        }, function(error){
           res.json(error);
        });
},

getList: function(req, res){
  if (req.param('boardId')){
    Board.findOne(req.param('boardId')).done(function(err, board){
      if (err){
        res.json(errors.errDb);
      }
      else if (board){
        List.findByBoardId(req.param('boardId')).done(function(err, lists){
          if (err){
            res.json(errors.errDb);
          }
          else {
            var promises = [];
            lists.forEach(function(list, i){
              promises.push(when.promise(function(resolve, reject){
                Issue.findByListId(lists[i].id).done(function(err, issues){
                  if (err){
                    reject();

                  }
                  else {
                    lists[i].issues = issues;
                    resolve();
                  }
                });

              }));

            });
            when.all(promises).done(function(){
              res.json(lists);
            }, function() {
              res.json(errors.errDb);
            });

          }

        });

      }
      else {
        res.json({error: 500, message: 'board not exist'});
      }
    });
  }
}

};
