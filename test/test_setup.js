var Sails = require('sails'),
   barrels = require('barrels'),
   fixtures, app;
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
  app.lower(done);
});