const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const path = require("path");

const app = express();

// Parse JSON & URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Login for users
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (err) return res.json({ success: false, error: err.message });
      if (result.length > 0) res.json({ success: true });
      else res.json({ success: false });
    }
  );
});

// Add customer
app.post("/customer", (req, res) => {
  const { name, phone, status } = req.body;
  db.query(
    "INSERT INTO customers (name, phone, status) VALUES (?,?,?)",
    [name, phone, status],
    (err) => {
      if (err) return res.json({ success: false });
      res.json({ success: true });
    }
  );
});

// Get customers
app.get("/customers", (req, res) => {
  db.query("SELECT * FROM customers", (err, result) => {
    if (err) return res.json([]);
    res.json(result);
  });
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
