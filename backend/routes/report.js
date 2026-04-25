const express = require("express");
const fs = require("fs");
const path = require("path");

const {
  analyzeFinance,
} = require("../utils/financeEngine");

const {
  buildDebtPlan,
} = require("../utils/debtEngine");

const {
  buildInvestmentPlan,
} = require("../utils/investmentEngine");

const {
  buildRetirementPlan,
} = require("../utils/retirementEngine");

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

    const user =
      users[users.length - 1];

    const finance =
      analyzeFinance(user);

    const debt =
      buildDebtPlan(user);

    const investments =
      buildInvestmentPlan(user);

    const retirement =
      buildRetirementPlan(user);

    const summary = {
      wealthScore:
        finance.wealthScore,
      risk:
        finance.financialRisk,
      nextPriority:
        debt.totalLoans > 0
          ? "Clear debt first"
          : "Invest for growth",
    };

    res.json({
      summary,
      finance,
      debt,
      investments,
      retirement,
    });
  } catch (error) {
    res.status(500).json({
      error:
        "Failed to generate report",
    });
  }
});

module.exports = router;