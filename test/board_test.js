'use strict';

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var setup = require('./test_setup');
describe('Board', function(){
	describe('#listByUser()', function(){
    it('should get 0 boards for user with id 2', function(done){
      Board.listByUser(2).then(function(boards){
      	expect(boards.length).to.equal(0);
        done();
      }, function(){
        done();
      });
    });

    it('should get 2 boards for user with id 1', function(done){
      Board.listByUser(1).then(function(boards){
      	expect(boards.length).to.equal(2);
        done();
      }, function(){
        done();
      });
    });
  });

  describe('#getLists()', function(){
    it('should get 3 lists for board with id 2', function(done){
      Board.getLists(2).then(function(lists){
      	expect(lists.length).to.equal(3);
      	var listOrder = lists.map(function(e){
      		return e.order;
      	});
      	expect(listOrder).to.eql([0, 1, 2]);
        done();
      }, function(){
        done();
      });
    });
  });
});