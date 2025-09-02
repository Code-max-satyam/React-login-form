const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "Satyam@#123",
    database: "signup",
    port: "3306"
});

app.post("/signup", (req, res) => {
    console.log("Signup data received:", req.body);  // 👈 check request data
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [req.body.name, req.body.email, req.body.password];

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.log("Database error:", err);
            return res.status(500).json("Error inserting user");
        }
        console.log("Data inserted:", data);
        return res.json({ message: "User registered successfully", data });
    });
});


app.post("/login", (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    const values = [
        req.body.email,
        req.body.password
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.log("Database error:", err);
            return res.status(500).json("Error");
        }
        if (data.length > 0) {
            return res.json({ message: "Login successful", data });
        } else {
            return res.status(401).json("Invalid email or password");
        }
    });
});


app.listen(8081, () => {
    console.log("Server running on port 8081");
});
