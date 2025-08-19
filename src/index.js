const express = require("express");
const dotenv = require("dotenv");
const movieRoutes = require("./routes/movieRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", movieRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("Endpoint not found");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
