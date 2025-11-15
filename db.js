const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Enkhee94:Enkhee1994@food-delivery.43e1vhu.mongodb.net/foodapp?appName=food-delivery"
    );
    console.log("DATABASE connection success");
  } catch (err) {
    console.log("DATABASE connection fail", err);
  }
};

module.exports = connectToDB;
