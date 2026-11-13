const bcrypt = require("bcryptjs");
const User = require("../models/User");

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

module.exports = { register };
