/**
 * Issue
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
/*global List, Issue*/
'use strict';
var when = require('when');
var errors = require('../services/errors');
module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
		summary: {
			type: 'string',
			required: true
		},
		description: {
			type: 'string'
		},
		severity: {
			type: 'integer',
			defaultsTo: 0
		},
		order:{
			type: 'integer',
			defaultsTo: 0
		},
		listId: {
			type: 'string',
			required: true
		},
		point: {
			type: 'integer',
			defaultsTo: 0
		},
		status: {
			type: 'integer',
			defaultsTo: 0
		},
		creatorId: {
			type: 'string',
			required: true
		}


    
  },

  getIssues: function(listId){
  	return when.promise(function(resolve, reject){
	    Issue.findByListId(listId).sort('order').done(function(err, issues){
	    	if (err){
	    		reject(errors.errDb);
	    	}
	    	else {
	    		resolve(issues);
	    	}

	    });
  	});
  },

  add: function(newIssue){
  	return when.promise(function(resolve, reject){
	  	if (newIssue.summary && 
	  		newIssue.summary !== '' &&
	  		newIssue.listId &&
	  		newIssue.creatorId){

	  		List.findOne(newIssue.listId).done(function(err, list){
	  			if (err){
	  				reject(errors.errDb);
	  			}
	  			else if (!list){
	  				reject({error: 500, message: 'can not find list'});
	  			}
	  			else {
	  				Issue.getIssues(newIssue.listId).then(function(issues){
	  					var largestOrder = -1;
	  					issues.forEach(function(i){
	  						if (i.order > largestOrder){
	  							largestOrder = i.order;
	  						}
	  					});
	  					newIssue.order = largestOrder + 1;
		  				Issue.create(newIssue).done(function(err, issue){
		  					if (err){
		  						reject(errors.errDb);
		  					}
		  					else {
		  						resolve(issue);
		  					}
		  				});
	  				}, function(err){
	  					reject(err);
	  				});
	  			}
	  		});
	  	}
	  	else {
	  		reject(errors.errInvalidFormat);

	  	}

  	});


  }

};
