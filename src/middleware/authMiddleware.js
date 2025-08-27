// Middleware untuk verifikasi token JWT
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      error: "Akses ditolak. Token tidak tersedia.",
    });
  }

  try {
    // Biasanya format: Bearer <token>
    const tokenValue = token.startsWith("Bearer ") ? token.slice(7) : token;
    const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      error: "Token tidak valid.",
    });
  }
};

module.exports = { verifyToken };
