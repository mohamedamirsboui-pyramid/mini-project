const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// تسجيل مستخدم جديد
const register = async (req, res) => {
  try {
    // نجبدو المعطيات من الـ body
    const { nom, login, password } = req.body;

    // نتأكدو أنو كل المعطيات موجودين
    if (!nom || !login || !password) {
      return res.status(400).json({ message: "nom, login et password sont requis" });
    }

    // نشوفو كان الـ login مستعمل من قبل
    const existing = await User.findOne({ login });
    if (existing) {
      return res.status(400).json({ message: "Ce login existe déjà" });
    }

    // نشفّرو الباسورد قبل ما نخزّنوه
    const hashed = await bcrypt.hash(password, 10);

    // نخزّنو المستخدم في الداتابيز
    const user = await User.create({ nom, login, password: hashed });

    // نرجّعو المستخدم من غير الباسورد
    res.status(201).json({
      id: user._id,
      nom: user.nom,
      login: user.login,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// fonction mta3 el connexion (login)
const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    // nlawjou 3al user bel login
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(401).json({ message: "Login ou mot de passe incorrect" });
    }

    // nqarnou el password elli ktebou m3a el hash elli fel base
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Login ou mot de passe incorrect" });
    }

    // nasn3ou el token (el "bracelet"), yekhdem 1 jour
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { register, login };
