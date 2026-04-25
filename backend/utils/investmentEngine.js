function toNum(value) {
  return Number(value || 0);
}

function buildInvestmentPlan(user) {
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

  const loans =
    toNum(user.creditCardLoan) +
    toNum(user.personalLoan) +
    toNum(user.bankLoan) +
    toNum(user.carLoan) +
    toNum(user.homeLoan);

  const surplus = income - expenses;

  let investable = surplus;

  if (loans > 0) {
    investable = surplus * 0.3;
  }

  if (investable < 0) investable = 0;

  const risk =
    user.riskLevel || "balanced";

  let allocation = {};

  if (risk === "conservative") {
    allocation = {
      FD: 35,
      Bonds: 30,
      Gold: 15,
      Nifty50: 15,
      Midcap: 5,
      Smallcap: 0,
    };
  } else if (risk === "aggressive") {
    allocation = {
      FD: 5,
      Bonds: 10,
      Gold: 10,
      Nifty50: 35,
      Midcap: 20,
      Smallcap: 20,
    };
  } else {
    allocation = {
      FD: 15,
      Bonds: 15,
      Gold: 10,
      Nifty50: 35,
      Midcap: 15,
      Smallcap: 10,
    };
  }

  const monthlyPlan = {};

  Object.keys(allocation).forEach(
    (key) => {
      monthlyPlan[key] = Math.round(
        (investable * allocation[key]) /
          100
      );
    }
  );

  return {
    monthlySurplus: surplus,
    investableAmount: Math.round(
      investable
    ),
    riskProfile: risk,
    allocation,
    monthlyPlan,
  };
}

module.exports = {
  buildInvestmentPlan,
};