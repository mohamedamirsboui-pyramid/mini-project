const mongoose = require("mongoose");

// الـ schema هو الشكل متاع المستخدم في الداتابيز
const userSchema = new mongoose.Schema(
  {
    // الإسم، لازم يكون موجود
    nom: { type: String, required: true },

    // الـ login لازم يكون موجود و ما يتعاودش (unique)
    login: { type: String, required: true, unique: true },

    // الباسورد باش يتخزّن مشفّر (bcrypt)، موش كيما كتبو المستخدم
    password: { type: String, required: true },

    // الدور: user ولا manager برك، و الافتراضي user
    role: { type: String, enum: ["user", "manager"], default: "user" },
  },
  // timestamps تزيد createdAt و updatedAt وحدها (تاريخ الإنشاء)
  { timestamps: true }
);

// نصدّر الموديل باش نستعملوه في ملفات أخرى
module.exports = mongoose.model("User", userSchema);
