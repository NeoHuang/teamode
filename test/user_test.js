'use strict';

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var setup = require('./test_setup');


describe('User', function(){
	describe('#checkNameNotExist()', function(){
    it('Admin should exist', function(done){
      User.checkNameNotExist('Admin').then(function(){
        done('"Admin" not exist');
      }, function(){
        done();
      });
    });

    it('Neo should not exist', function(done){
      User.checkNameNotExist('Neo').then(function(){
        done();
      }, function(){
        done('"Neo" exist');
      });
    });
  });

  describe('#checkNameExist()', function(){
    it('Admin should exist', function(done){
      User.checkNameExist('Admin').then(function(){
        done();
      }, function(){
        done('"Admin" exist');
      });
    });

    it('admin should exist', function(done){
      User.checkNameExist('admin').then(function(){
        done();
      }, function(){
        done('"admin" not exist');
      });
    });

    it('Neo should not exist', function(done){
      User.checkNameExist('Neo').then(function(){
        done('"Neo" exist');
      }, function(){
        done();
      });
    });
  });

  describe('#add()', function() {
    it('should fail because Admin exist', function(done){
      var user = {
        username: 'admin',
        password: 'abc',
        email: 'abc@hotmail.com',
      }
      User.add(user).done(function(){
        done('should failed');
      }, function(){
        done();
      });
    });

    it('should fail because email exist', function(done){
      var user = {
        username: 'admin',
        password: 'abcdefg',
        email: 'admin@abc.com',
      }
      User.add(user).done(function(){
        done('should failed');
      }, function(err){
        assert.equal(err.message, 'user exist');
        done();
      });
    });

    it('should fail because email exist', function(done){
      var user = {
        username: 'neo',
        password: 'abcdefg',
        email: 'admin@abc.com',
      }
      User.add(user).done(function(){
        done('should failed');
      }, function(err){
        assert.equal(err.message, 'email exist');
        done();
      });
    });


    it('should fail because email is null', function(done){
      var user = {
        username: 'neo',
        password: 'abcdefg',
        email: null
      }
      User.add(user).done(function(){
        done('should failed');
      }, function(err){
        expect(err.message).to.contain('required information not complete');
        done();
      });

    });

    it('should fail because password is null', function(done){
      var user = {
        username: 'neo',
        password: null,
        email: 'abc@adfadf.com'
      }
      User.add(user).done(function(){
        done('should failed');
      }, function(err){
        
        expect(err.message).to.contain('required information not complete');
        done();
      });
    });

    it('should fail because username is null', function(done){
      var user = {
        username: null,
        password: 'abcdefg',
        email: 'abc@asdfa.com'
      }
      User.add(user).done(function(){
        done('should failed');
      }, function(err){
        
        expect(err.message).to.contain('required information not complete');
        done();
      });
    });

    it('should fail because username contains $', function(done){
      var user = {
        username: '$adfa',
        password: 'abcdefg',
        email: 'abc@asdfasdfs.com'
      }
      User.add(user).done(function(){
        done('should failed');
      }, function(err){
        
        expect(err.message).to.equal('invalid username format');
        done();
      });
    });

    it('should fail because username is too short', function(done){
      var user = {
        username: 'fa',
        password: 'abcdefg',
        email: 'abc@asdfasdfs.com'
      }
      User.add(user).done(function(){
        done('should failed');
      }, function(err){
        
        expect(err.message).to.equal('invalid username format');
        done();
      });
    });

    it('should fail because username is too long', function(done){
      var user = {
        username: '123456789012345678901',
        password: 'abcdefg',
        email: 'abc@asdfasdfs.com'
      }
      User.add(user).done(function(){
        done('should failed');
      }, function(err){
        
        expect(err.message).to.equal('invalid username format');
        done();
      });
    });

    it('should fail because username is too short', function(done){
      var user = {
        username: 'fa',
        password: 'abcdefg',
        email: 'abc@asdfasdfs.com'
      }
      User.add(user).done(function(){
        done('should failed');
      }, function(err){
        
        expect(err.message).to.equal('invalid username format');
        done();
      });
    });

    it('should fail because password is too short', function(done){
      var user = {
        username: 'faasdfa',
        password: 'abcde',
        email: 'abc@asdfasdfs.com'
      }
      User.add(user).done(function(){
        done('should failed');
      }, function(err){
        
        expect(err.message).to.equal('invalid password format');
        done();
      });
    });

    it('should fail because password is too long', function(done){
      var user = {
        username: 'faasdfa',
        password: '123456789012345678901',
        email: 'abc@asdfasdfs.com'
      }
      User.add(user).done(function(){
        done('should failed');
      }, function(err){
        
        expect(err.message).to.equal('invalid password format');
        done();
      });
    });        

    it('should successfully add a user', function(done){
      var user = {
        username: 'Neo',
        password: 'abcdefg',
        email: 'abc@asdfasdfs.com'
      }
      User.add(user).done(function(){
        done();
      }, function(err){
        done(err.message);
      });
    });

  });


});