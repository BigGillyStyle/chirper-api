module.exports = function(req, res, render) {

  var findQuery;

  if (req.query.me && !req.user) {
    return render("You're not logged in!");
  }

  if (req.query.me) {
    findQuery = {
      where: { id: req.user }
    };
  }

  req.models.user
  .findAll(findQuery)
  .then(function(users) {
    render(users);
  })
  .catch(function(err) {
    render(err);
  });

};
