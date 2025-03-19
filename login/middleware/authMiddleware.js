const jwt = require('jsonwebtoken');
const secretkey = process.env.secretkey || "sarwar";

function jwtverification(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    console.log("Authorization Header:", bearerHeader); // Debugging

    if (!bearerHeader) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const tokenParts = bearerHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer" || !tokenParts[1]) {
      return res.status(401).json({ error: "Unauthorized: Invalid token format" });
    }

    const token = tokenParts[1];
    console.log("Extracted Token:", token); // Debugging

    jwt.verify(token, secretkey, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }

      console.log("Decoded JWT Payload:", decoded); // Debugging

      if (!decoded.user || !decoded.user.id) {
        console.error("Invalid token structure:", decoded);
        return res.status(401).json({ error: "Unauthorized: Invalid token payload" });
      }

      req.user = decoded.user; // Attach user data
      console.log("User set in req:", req.user); // Debugging
      next();
    });
}

module.exports = { jwtverification };
