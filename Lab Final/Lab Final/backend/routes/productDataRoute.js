const express = require("express");
const router = express.Router();
const productData = require("../models/productDataModel");

//CREATE POST
router.post("/", async (req, res) => {
  const { name, description, price, category, isFeatured } = req.body;
  const userId = req?.user.userId;
  try {
    const productAdded = await productData.create({
      name,
      description,
      userId,
      price,
      category,
      isFeatured,
    });
    res.status(201).json(productAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// GET POST BY USER
router.get("/", async (req, res) => {
  try {
    const userId = req?.user.userId;
    const allProducts = await productData.find({ userId: userId });

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET SINGLE POST
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleProduct = await productData.findById(id);
    res.status(200).json(singleProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await productData.findByIdAndDelete(id);
    res.status(201).json(deleteProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//UPDATE POST BY ID
router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateProduct = await productData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
