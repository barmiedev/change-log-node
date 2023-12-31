import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * Compares a password with a hash and returns a boolean
 */
export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

/**
 * Hashes a password and returns a promise
 */
export const hashPassword = (password) => {
  return bcrypt.hash(password, 7);
};

/**
 * Creates a JWT and returns it
 */
export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

/**
 * Protects a route with JWT
 * using the Authorization header with the Bearer scheme
 */
export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res
      .status(401)
      .json({ message: "You need to be logged in to visit this route" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401).json({ message: "No valid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: "No valid token" });
    return;
  }
};
