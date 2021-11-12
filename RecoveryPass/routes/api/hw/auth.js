const isLoggedIn = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).send('No ha iniciado sesión, Error 401.');
    }
  }
  module.exports = isLoggedIn