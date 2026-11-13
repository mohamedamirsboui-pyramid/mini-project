const mongoose = require("mongoose");

// الـ schema متاع المشروع
const projectSchema = new mongoose.Schema(
  {
    // إسم المشروع، لازم يكون موجود
    nom: { type: String, required: true },

    description: { type: String },

    // صاحب المشروع: نخزّنو الـ id متاع المستخدم (reference على User)
    proprietaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // الحالة: كان القيم هاذم برك، و الافتراضي "en cours"
    statut: {
      type: String,
      enum: ["en cours", "terminé", "en pause"],
      default: "en cours",
    },
  },
  // تاريخ الإنشاء (createdAt) يتزاد وحدو
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
