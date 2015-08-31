module.exports = function(req, res, render) {

  req.models.user
  .findAll()
  .then(function(users) {
    render(users);
  })
  .catch(function(err) {
    render(err);
  });

};