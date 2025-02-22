const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Naga@1975",
  database: "todolist",
});

db.connect((err) => {
  if (err) {
    console.error("Error while connecting to the DB:", err);
  } else {
    console.log("Connected to DB");
  }
});

// ✅ Fetch all users
app.get("/get", (req, res) => {
  const sql = "SELECT * FROM data";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error while getting data from DB:", err);
      return res.status(500).json({ message: "Error getting data from DB" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No data exists in DB" });
    }
    return res.status(200).json(results);
  });
});

// ✅ Fetch a single user by ID (needed for updating)
app.get("/get/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM data WHERE Id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching user from DB:", err);
      return res.status(500).json({ message: "Error fetching user" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(results[0]); // ✅ Return first result as object
  });
});

// ✅ Insert a new user
app.post("/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sql = "INSERT INTO data (Name, Email, Contact) VALUES (?, ?, ?)";

  db.query(sql, [name, email, contact], (err) => {
    if (err) {
      console.error("Error inserting data into DB:", err);
      return res.status(500).json({ message: "Error inserting data into DB" });
    }
    return res.status(200).json({ message: "User added successfully" });
  });
});

// ✅ Delete a user
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM data WHERE Id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Error deleting user from DB:", err);
      return res.status(500).json({ message: "Error deleting user" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  });
});

// ✅ Update a user
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sql = "UPDATE data SET Name = ?, Email = ?, Contact = ? WHERE Id = ?";

  db.query(sql, [name, email, contact, id], (err) => {
    if (err) {
      console.error("Error while updating the data:", err);
      return res.status(500).json({ message: "Error while updating the data" });
    }
    return res.status(200).json({ message: "User updated successfully" });
  });
});

app.listen(7777, () => {
  console.log("Listening on port 7777");
});
