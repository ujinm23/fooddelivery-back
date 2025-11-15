const express = require("express");
const cors = require("cors");
const connectToDB = require("./db");
const Usermodel = require("./schemas/userSchema");



const app = express();
const PORT = 999;

app.use(cors());
app.use(express.json());

connectToDB();

app.get("/", async (req, res) => {
  try{
  const data = await Usermodel.create({firstName: "easlbeg", email: 'newuser@gmail.com', password: "123456"});
  res.json(data);
  } catch (err) {
    res.status (500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("API listening on http://localhost:" + PORT);
});
