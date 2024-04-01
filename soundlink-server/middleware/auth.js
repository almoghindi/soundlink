const { verifyToken } = require("../util/jws");

const auth = (req, res, next) => {
  try {
    const userToken = req.header("authorization");
    if (!userToken) {
      return res.status(401).json({ error: "UnAuthorized" });
    }
    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ error: "UnAuthorized" });
    }
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Expired" });
  }
};

export default auth;
