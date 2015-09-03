var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
  if (!req.token) {
    return next();
  }

  var secret = 's3cret_c0de';

  try {
    var claim = jwt.decode(req.token, secret);

    if (claim.userId) {
      req.user = claim.userId;
    }

    next();
  } catch (err) {
    console.log("Error decoding");
    next();
  }
};
