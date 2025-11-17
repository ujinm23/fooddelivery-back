const { Schema, model } = require("mongoose");

const FoodCategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("FoodCategory", FoodCategorySchema);
