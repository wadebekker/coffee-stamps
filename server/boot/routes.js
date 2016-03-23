module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/ping', function(req, res) {
    res.send('pong');
  });

  //verified
  app.get('/verified', function(req, res) {
    res.render('verified');
  });
};
