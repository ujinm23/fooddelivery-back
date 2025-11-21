const express = require("express");
const router = express.Router();

const { signUp, signIn, checkEmail } = require("../controllers/user/authController");

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

// 👉 Step1
router.post("/check-email", checkEmail);

module.exports = router;
