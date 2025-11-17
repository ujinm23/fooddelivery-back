const express = require("express");
const cors = require("cors");
const connectToDB = require("./db");
const userRouter = require("./routes/userRoutes");

const app = express();
const PORT = 999;

app.use(cors());
app.use(express.json());

connectToDB();

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log("API listening on http://localhost:" + PORT);
});
