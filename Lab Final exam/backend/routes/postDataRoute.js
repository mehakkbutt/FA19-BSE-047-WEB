const express = require("express");
const router = express.Router();
const postData = require("../models/postDataModel");

//CREATE POST
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const userId = req?.user.userId;
  try {
    const postAdded = await postData.create({
      title: title,
      description: description,
      userId: userId,
    });
    res.status(201).json(postAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// GET POST BY USER
router.get("/", async (req, res) => {
  try {
    const userId = req?.user.userId;
    const allPosts = await postData.find({ userId: userId });

    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET SINGLE POST
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singlePost = await postData.findById(id);
    res.status(200).json(singlePost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletePost = await postData.findByIdAndDelete(id);
    res.status(201).json(deletePost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//UPDATE POST BY ID
router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPost = await postData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
