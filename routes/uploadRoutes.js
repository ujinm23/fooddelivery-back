const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

router.post("/", async (req, res) => {
  try {
    const fileStr = req.body.data;
    if (!fileStr) return res.status(400).json({ error: "No file data" });

    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "food-app",
    });

    res.json({ url: uploadedResponse.secure_url });
  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
