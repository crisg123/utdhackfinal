const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const bearerHeader = req.headers["x-access-token"];
  let token;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    token = bearerToken;
  }
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log('stop here 1')
    req.user = verified;
    console.log('stop here 2')
    next();
    console.log('stop here 3')
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
