const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [2, "First name must be at least 2 characters"],
      maxLength: [50, "First name must be less than 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    phoneNumber: {
      type: String,
      required: false,
    },

    address: {
      type: String,
      required: false,
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN", "RESTAURANT", "DRIVER"],
      default: "USER",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
