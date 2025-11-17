const express = require("express");
const FoodCategory = require("../schemas/foodCategorySchema");

const router = express.Router();


router.get("/", async (req, res) => {
  const categories = await FoodCategory.find();
  res.send(categories);
});


router.post("/", async (req, res) => {
  try {
    const category = await FoodCategory.create(req.body);
    res.send({
      message: "Food category created successfully",
      data: category
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
