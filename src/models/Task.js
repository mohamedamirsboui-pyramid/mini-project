const mongoose = require("mongoose");

// الـ schema متاع الـ tâche
const taskSchema = new mongoose.Schema(
  {
    // العنوان، لازم يكون موجود
    titre: { type: String, required: true },

    description: { type: String },

    // الحالة: todo ولا doing ولا done برك، و الافتراضي todo
    statut: {
      type: String,
      enum: ["todo", "doing", "done"],
      default: "todo",
    },

    // آخر أجل للمهمة
    deadline: { type: Date },

    // المشروع اللي تابعة ليه المهمة (reference على Project)
    projet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    // المستخدم المكلّف بالمهمة، موش لازم (تبدا من غير ما تتعيّن)
    utilisateurAssigne: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  // تاريخ الإنشاء (createdAt) يتزاد وحدو
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
