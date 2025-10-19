const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); 
    res.render("edit", { products, layout: false }); // 
    products.forEach(product => {
    });
    } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Error loading products");
  }
});

 
module.exports = router;
 