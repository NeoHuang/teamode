/**
 * List
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
  	name: 'string',
  	boardId: 'integer',
  	order: 'integer',
  	status: 'integer'//0: normal, 1: archived
    
  }

};
