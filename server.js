require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Todo API is running...");
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
});
