const express = require("express");
const Food = require("../schemas/foodSchema");
const FoodCategory = require("../schemas/foodCategorySchema"); // ❗ заавал хэрэгтэй

const router = express.Router();

// ===================== GET FOODS =====================
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find().populate("category"); // ❗ категорийн нэрийг populate
    res.send(foods);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ===================== GET ONE FOOD =====================
router.get("/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate("category");
    if (!food) return res.status(404).send({ error: "Food not found" });
    res.send(food);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// ===================== CREATE FOOD =====================
router.post("/", async (req, res) => {
  try {
    const newFood = await Food.create(req.body);

    // ➕ Category дотор dishes-д ID-г push хийнэ
    await FoodCategory.findByIdAndUpdate(req.body.category, {
      $push: { dishes: newFood._id },
    });

    res.send({ message: "Food added", data: newFood });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// ===================== UPDATE =====================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(updated);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// ===================== DELETE =====================
router.delete("/:id", async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.send({ message: "Food deleted" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
