const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../schemas/userSchema");

const router = express.Router();

// --- ЭНД ШИНЭЭР НЭМЖ БАЙНА (CHECK EMAIL) ---
router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      // Хэрэв хэрэглэгч аль хэдийн бүртгэлтэй байвал
      return res.status(400).json({ message: "Email already exists" });
    }
    // Хэрэв бүртгэлгүй бол зөвшөөрнө
    res.json({ success: true, message: "Email is available" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ------------------------------------------

// SIGN UP
router.post("/sign-up", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Email шалгах
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email болон password заавал оруулна уу" });
    }

    // Email аль хэдийн бүртгэлтэй эсэхийг шалгах
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Хэрэглэгч үүсгэх
    const user = await User.create({
      email,
      password, // Одоогийн байдлаар hash хийхгүй (login-д шууд харьцуулж байгаа)
    });

    // Token үүсгэх
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      message: "Бүртгэл амжилттай үүслээ!",
      token,
      user: {
        _id: user._id,
        id: user._id,
        email: user.email,
        firstName: user.firstName || "",
        role: user.role || "user",
      },
    });
  } catch (err) {
    console.error("Sign up error:", err);
    res.status(500).json({ message: err.message || "Бүртгэл үүсгэхэд алдаа гарлаа" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  console.log("REQ BODY ===>", req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        id: user._id,
        email: user.email,
        firstName: user.firstName || "",
        role: user.role || "user",
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;