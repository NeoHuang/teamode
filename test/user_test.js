var assert = require('assert')
  , Sails = require('sails')
  , barrels = require('barrels')
  , fixtures, app;

before(function (done) {
  // Lift Sails with test database
  Sails.lift({
    log: {
      level: 'error'
    },
    adapters: {
      default: 'sails-memory'
    }
  }, function(err, sails) {
    if (err)
      return done(err);
    app = sails;
    // Load fixtures
    barrels.populate(function(err) {
      fixtures = barrels.objects;
      done(err, sails);
    });
    // Save original objects in `fixtures` variable
  });
});

after(function (done) {
  console.log("all done");
  app.lower(done);
});

describe('User', function(){
	describe("#checkNameNotExist()", function(){
    it('Admin should exist', function(done){
      User.checkNameNotExist('Admin').then(function(){
        assert(false);
        done();
      }, function(err){
        assert(true);
        done();
      });
    })

    it('Neo should not exist', function(done){
      User.checkNameNotExist('Neo').then(function(){
        assert(true);
        done();
      }, function(err){
        assert(false, 'Neo exists');
        done();
      });
    })
  })
})