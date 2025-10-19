const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { upload } = require("../config/cloudinary");

// صفحة تعديل المنتج
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("المنتج غير موجود");
    res.render("editing", { product, layout: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("خطأ في تحميل صفحة التعديل");
  }
});

// حفظ التعديلات
router.put("/product/:id", upload.array("images", 5), async (req, res) => {
  try {
    let images = [];

    // لو رفع صور جديدة، نحفظها بدل القديمة
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => file.path);
    }

    await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      labels: req.body.labels ? req.body.labels.split(",") : [],
      ...(images.length > 0 && { images })  // replace images only if new ones uploaded
    });

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("تعذر تعديل المنتج");
  }
});

module.exports = router;
