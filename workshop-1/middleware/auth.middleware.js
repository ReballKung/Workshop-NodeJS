const jwt = require("jsonwebtoken");

const middleware = {
  AuthCheck: async function (req, res, next) {
    try {
      const token = req.headers.authorization.split("Bearer ")[1];
      const decoded = jwt.verify(token , '1111');
      req.auth = decoded;
      return next();

    } catch (error) {
      return res.status(401).send({
        status: 401,
        message: "Failed to authenticate token",
      });
    }
  },
};

module.exports = { ...middleware };
