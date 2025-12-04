require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./db");

const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const foodRouter = require("./routes/foodRoutes");
const orderRouter = require("./routes/FoodOrderRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
const PORT = 999;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

connectToDB();

app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/foods", foodRouter);
app.use("/api/orders", orderRouter);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log("API listening on http://localhost:" + PORT);
});
