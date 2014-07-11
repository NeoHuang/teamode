/**
 * IssueController
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
   * (specific to IssueController)
   */
   _config: {},

   add: function(req, res){
   	var user = req.user;
   	var newIssue = {
   		summary: req.param('summary'),
   		description: req.param('description'),
   		creatorId: user.id,
   		listId: req.param('listId'),
   		point: req.param('point') || 0,
   		severity: req.param('severity') || 0

   	};
   	Issue.add(newIssue).then(function(issue){
   		res.json(issue);
   	}, function(error){
   		res.json(error);
   	});
   },

   changeOrder: function(req, res){
   	var order = req.param('order').split(',').map(function(e){
   		return e.trim();
   	});
   	var orderData = {
   		listId: req.param('listId'),
   		order: order
   	};
   	if (orderData.listId != null && 
   		orderData.listId != undefined && 
   		orderData.order != null && 
   		orderData.order != undefined){
   		Issue.getIssues(orderData.listId).done(function(issues){
   			var sortedOrder = orderData.order.slice(0);
   			sortedOrder.sort();
   			var sortedList = issues.map(function(l){
   				return l.id.toString();
   			}).sort();

   			if (JSON.stringify(sortedOrder) != JSON.stringify(sortedList)){
   				res.json(errors.errInvalidData);

   			}
   			else {
   				var promises = [];
   				orderData.order.forEach(function(o, oi){
   					issues.forEach(function(l, li){
   						if (o === l.id &&
   							oi !== l.order){
   							issues[li].order = oi;
   						issues[li].changed = true;
   					
   					}
   				});
   				});

   				issues.forEach(function(issue){
   					if (issue.changed === true){
   						promises.push(when.promise(function(resolve, reject){
   							issue.save(function(err){
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
	},

	move: function(req, res){
		var moveData = {
			issueId: req.param('issueId'),
			to: req.param('to'),
			order: req.param('order')
		};
		if (moveData.issueId !== null &&
			moveData.to !== null &&
			moveData.order !== null){
			Issue.findOne(moveData.issueId).done(function(err, issue){
				if (err){
					res.json(errors.errDb);
				}
				else if (!issue){
					res.json(errors.errIssueNotFount);
				}
				else {


					List.isInSameBoard([issue.listId, moveData.to]).done(function(){
						var promises = [];
						//increase the order of all issues whose order is larger or equal to moveData.order in target list;
						Issue.getIssues(moveData.to).done(function(issues){
							issues.forEach(function(i, index){
								if (index >= moveData.order){
									i.order = index + 1;
									promises.push(when.promise(function(resolve, reject){
										i.save(function(err){
											if (err){
												reject();
											}
											else {
												resolve();
											}

										});

									}));

								}
								else {
									i.order = index;
									promises.push(when.promise(function(resolve, reject){
										i.save(function(err){
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
						}, function(){
							res.json(errors.errDb);
						});
							
						when.all(promises).done(function(){
							issue.listId = moveData.to;
							issue.order = moveData.order;
							issue.save(function(err){
								if (err){
									res.json(errors.errDb);
								}
								else {
									res.json({status: 200});

								}
							});

						}, function(){
							res.json(errors.errDb);

						});


					}, function(){
						res.json({error: 500, message: 'source and target are not in same board.'});
					});

				}
			});

		}
		else {
			res.json(errors.errInvalidFormat);
		}

	}


};
