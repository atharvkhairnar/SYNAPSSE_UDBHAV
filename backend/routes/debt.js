const express = require("express");
const fs = require("fs");
const path = require("path");

const { buildDebtPlan } = require("../utils/debtEngine");

const router = express.Router();

const usersFile = path.join(
  __dirname,
  "../data/users.json"
);

router.get("/latest", (req, res) => {
  try {
    const users = JSON.parse(
      fs.readFileSync(usersFile, "utf8")
    );

    if (users.length === 0) {
      return res.json({
        message: "No users found",
      });
    }

    const latestUser =
      users[users.length - 1];

    const report =
      buildDebtPlan(latestUser);

    res.json(report);
  } catch (error) {
    res.status(500).json({
      error: "Debt plan failed",
    });
  }
});

module.exports = router;