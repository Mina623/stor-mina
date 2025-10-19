// const mongoose = require("mongoose");
// const productSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   mage: String,
//   labels: [String], // بدل freeShipping و bestPrice و limitedStock
// });
// module.exports = mongoose.model("Product", productSchema);
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String], // ✅ Array of images URLs
    required: true,
  },
  labels: {
    type: [String],
    default: [],
  },
  discr: {
    type: [String],
    default: [],
    
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Product", productSchema);

