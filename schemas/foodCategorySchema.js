const { Schema, model } = require("mongoose");

const FoodCategorySchema = new Schema(
  {
    categoryName: { type: String, required: true },
    dishes: [{ type: Schema.Types.ObjectId, ref: "Food" }],
  },
  { timestamps: true }
);

module.exports = model("FoodCategory", FoodCategorySchema);
