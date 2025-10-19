const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ✅ هنا استدعينا إعدادات Cloudinary + Multer Storage
const { upload } = require("../config/cloudinary");

// ✅ عرض صفحة إضافة منتج
router.get("/", (req, res) => {
  res.render("admin_add", { layout: false } );
});

// ✅ استلام بيانات المنتج + رفع أكتر من صورة (حد أقصى 5 صور)
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const { name, price, labels, discr } = req.body;

    // تحويل الوسوم من نص إلى Array
    const labelsArray = labels
      ? labels.split(",").map((l) => l.trim())
      : [];

    // ✅ تجميع روابط الصور اللي اترفعت على Cloudinary
    const images = req.files.map(file => file.path);

    // ✅ إنشاء منتج جديد
    await Product.create({
    ...req.body,         //name, price = req.body
    images,
    labels: labelsArray, // to chang labels :string to labels :arrat
    });

    console.log("✅ Product added successfully!");
    res.redirect("/admin?success=1");
    
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).send("Error while adding product");
    res.redirect("/admin?error=1");
  }
});

module.exports = router;
