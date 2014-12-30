/**
 * Meeting
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    ownerId: {
    	type: 'string',
    	required: true
    },

    startTime: {
    	type: 'datetime',
    },

    endTime: {
    	type: 'datetime',
    },

    status: {
    	type: 'integer',
    }
  }

};
