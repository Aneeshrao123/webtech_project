const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory (for CSS and JS files)
app.use(express.static(path.join(__dirname, "public")));

// Route to serve the main HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// API route to get car data from cars.json (just to be sure it's handled)
app.get("/api/cars", (req, res) => {
  fs.readFile("cars.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading car data.");
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
