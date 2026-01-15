
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).send({ error: "Not authorized" });
  }
  next();
}

export default requireLogin;