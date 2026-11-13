const jwt = require("jsonwebtoken");

// middleware 1: yet2akked eli el user 3andou token s7i7
const protect = (req, res, next) => {
  // el token yji fel header hakka: "Authorization: Bearer <token>"
  const header = req.headers.authorization;

  // ken ma fama 7ata header wala ma yebda4ch b "Bearer " => mamnou3 el dkhoul
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant" });
  }

  // nakhdhou el token bark (n7ayou "Bearer ")
  const token = header.split(" ")[1];

  try {
    // nthabtou fel token bel secret (ken mzayyef wala expiré, yetla3 erreur)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // n7ottou ma3loumet el user 3al request bech el routes ba3d yestaghlouha
    req.user = { id: decoded.id, role: decoded.role };

    // kol chay s7i7, nkamlou lel étape jeya
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

// middleware 2: yet2akked eli el user manager (yet3ada ba3d protect)
const isManager = (req, res, next) => {
  if (req.user.role !== "manager") {
    return res.status(403).json({ message: "Accès réservé au manager" });
  }
  next();
};

module.exports = { protect, isManager };
