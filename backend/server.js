const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const usersFile = path.join(__dirname, "data", "users.json");

// create file if missing
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, "[]");
}

app.get("/", (req, res) => {
  res.send("WealthPath Backend Running 🚀");
});

app.get("/api/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile, "utf8"));
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile, "utf8"));

  users.push(req.body);

  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({
    success: true,
    message: "User saved successfully"
  });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://127.0.0.1:${PORT}`);
});