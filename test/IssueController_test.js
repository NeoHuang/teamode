'use strict';

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var setup = require('./test_setup');
var IssueController = require('../api/controllers/IssueController');
describe('IssueController', function(){

	describe('#changeOrder()', function(){
        beforeEach(setup.resetDb);
		it('should fail because list length is not equal to order length', function(done){
    	var req = {
    		param: function(name){
    			if (name === 'listId'){
    				return 1;
    			}
    			if (name === 'order'){
    				return '1, 5';
    			}
    		}
    	}
    	var res = {
    		json: function(data){
    			expect(data.message).to.equal('invalid request input');
    			done();
    		}
    	}
      IssueController.changeOrder(req, res);
    });

    it('should success', function(done){
    	var req = {
    		param: function(name){
    			if (name === 'listId'){
    				return '1';
    			}
    			if (name === 'order'){
    				return '1, 5, 2';
    			}
    		}
    	}
    	var res = {
    		json: function(data){
    			expect(data.status).to.equal(200);
    			done();
    		}
    	}
      IssueController.changeOrder(req, res);
    });

  });

  describe('#move()', function(){
    beforeEach(setup.resetDb);
    it('should success', function(done){
        var req = {
            param: function(name){
                if (name === 'issueId'){
                    return '3';
                }
                if (name === 'to'){
                    return '4';
                }
                if (name === 'order'){
                    return '1';
                }
            }
        }
        var res = {
            json: function(data){
                expect(data.status).to.equal(200);
                done();
            }
        }
      IssueController.move(req, res);

    });
  });
});