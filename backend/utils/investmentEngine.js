function toNum(value) {
  return Number(value || 0);
}

function buildInvestmentPlan(user) {
  const age = toNum(user.age);

  const income =
    toNum(user.salary) +
    toNum(user.familyIncome) +
    toNum(user.sideIncome);

  const expenses =
    toNum(user.rent) +
    toNum(user.electricity) +
    toNum(user.food) +
    toNum(user.milk) +
    toNum(user.fuel) +
    toNum(user.recharge) +
    toNum(user.misc);

  const emergencyFund =
    toNum(user.emergencyFund);

  const loans =
    toNum(user.creditCardLoan) +
    toNum(user.personalLoan) +
    toNum(user.bankLoan) +
    toNum(user.carLoan) +
    toNum(user.homeLoan);

  let monthlySurplus =
    income - expenses;

  if (monthlySurplus < 0) {
    monthlySurplus = 0;
  }

  const emergencyMonths =
    expenses > 0
      ? emergencyFund / expenses
      : 0;

  const risk =
    user.riskLevel ||
    "balanced";

  let investableAmount =
    monthlySurplus;

  let strategy =
    "Start disciplined investing.";

  // Debt pressure logic
  if (loans > 0) {
    investableAmount =
      monthlySurplus * 0.4;

    strategy =
      "Debt exists: focus majority surplus on repayment.";
  }

  // Low emergency fund logic
  if (
    emergencyMonths < 6
  ) {
    investableAmount =
      monthlySurplus * 0.3;

    strategy =
      "Low emergency reserve: build safety fund first.";
  }

  investableAmount =
    Math.round(
      investableAmount
    );

  let allocation = {};

  // Conservative
  if (
    risk ===
    "conservative"
  ) {
    allocation = {
      FD: 30,
      Bonds: 25,
      Gold: 10,
      Nifty50: 20,
      Midcap: 10,
      Smallcap: 5,
    };
  }

  // Aggressive
  else if (
    risk ===
    "aggressive"
  ) {
    allocation = {
      FD: 5,
      Bonds: 5,
      Gold: 5,
      Nifty50: 40,
      Midcap: 25,
      Smallcap: 20,
    };
  }

  // Balanced default
  else {
    allocation = {
      FD: 15,
      Bonds: 15,
      Gold: 10,
      Nifty50: 35,
      Midcap: 15,
      Smallcap: 10,
    };
  }

  // Age adjustment
  if (age >= 45) {
    allocation.Smallcap = 5;
    allocation.Midcap = 10;
    allocation.FD += 10;
    allocation.Bonds += 5;
  }

  const monthlyPlan = {};

  Object.keys(
    allocation
  ).forEach((key) => {
    monthlyPlan[key] =
      Math.round(
        (investableAmount *
          allocation[key]) /
          100
      );
  });

  return {
    monthlySurplus,
    investableAmount,
    riskProfile:
      risk,
    emergencyMonths:
      Number(
        emergencyMonths.toFixed(
          1
        )
      ),
    strategy,
    allocation,
    monthlyPlan,
  };
}

module.exports = {
  buildInvestmentPlan,
};