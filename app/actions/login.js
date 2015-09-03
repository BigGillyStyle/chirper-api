var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');

module.exports = function (req, res, render) {
  if (req.body.grant_type !== 'password') {
    return render("Unsupported grant type");
  }
  req.models.user.find({
      where: {
        username: req.body.username
      }
    })
    .then(function (user) {
      var hash = user.get({
        role: 'admin'
      }).hash;

      bcrypt.compare(req.body.password, hash, function (err, match) {
        if (err || !match) {
          return render([400, "Wrong password!"]);
        }

        var claim = {
          userId: user.id
        };
        var secret = 's3cret_c0de';

        var token = jwt.encode(claim, secret);

        res.json({
          'access_token': token,
          'token_type': 'bearer'
        });
      });
    })
    .catch(function(err) {
      return render([400, "No user with this username was found!"]);
    });
};
