const express = require("express");
const User = require("../schemas/userSchema");
const createUser = require("../controllers/user/createUser");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

userRouter.post("/", createUser);

userRouter.put("/", (req, res) => {
  res.send("hello PUT");
});

userRouter.patch("/", (req, res) => {
  res.send("hello PATCH");
});

userRouter.delete("/", (req, res) => {
  res.send("hello DELETE");
});

module.exports = userRouter;
