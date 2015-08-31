module.exports = function(req, res, render) {

  req.models.chirp
  .create(req.body.chirp)
  .then(function(chirp) {
    render(chirp);
  })
  .catch(function(err) {
    render(err);
  });

};