/**
 * Issue
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var when = require('when')
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
		type: 'integer',
		required: true
	},
	point: {
		type: 'integer',
		defaultsTo: 0
	},
	creatorId: {
		type: 'integer',
		required: true
	}


    
  },

  add: function(newIssue){
  	return when.promise(function(resolve, reject, notify){
	  	if (newIssue.summary && 
	  		newIssue.summary != "" &&
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
	  				Issue.create(newIssue).done(function(err, issue){
	  					if (err){
	  						reject(errors.errDb);
	  					}
	  					else {
	  						resolve(issue);
	  					}
	  				})
	  			}
	  		});
	  	}
	  	else {
	  		reject(errors.errInvalidFormat);

	  	}

  	})


  }

};
