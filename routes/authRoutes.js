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
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;