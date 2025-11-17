const express = require("express");
const createUser = require("../controllers/user/createUser");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("hello GET");
});

userRouter.put("/", (req, res) => {
  res.send("hello PUT");
});

userRouter.delete("/", (req, res) => {
  res.send("hello DELETE");
});

userRouter.post("/", createUser);

module.exports = userRouter;
