function toNum(value) {
  return Number(value || 0);
}

function futureCost(current, inflation, years) {
  return current * Math.pow(1 + inflation, years);
}

function sipFutureValue(monthly, annualRate, months) {
  const r = annualRate / 12;
  if (r === 0) return monthly * months;

  return (
    monthly *
    ((Math.pow(1 + r, months) - 1) / r) *
    (1 + r)
  );
}

function analyzeFinance(user) {
  // ======================
  // INCOME
  // ======================
  const income =
    toNum(user.salary) +
    toNum(user.familyIncome) +
    toNum(user.sideIncome);

  // ======================
  // EXPENSES
  // ======================
  const expenses =
    toNum(user.rent) +
    toNum(user.electricity) +
    toNum(user.food) +
    toNum(user.milk) +
    toNum(user.fuel) +
    toNum(user.recharge) +
    toNum(user.misc);

  // ======================
  // LOANS
  // ======================
  const loans =
    toNum(user.creditCardLoan) +
    toNum(user.personalLoan) +
    toNum(user.bankLoan) +
    toNum(user.carLoan) +
    toNum(user.homeLoan);

  // ======================
  // INVESTMENTS
  // ======================
  const investments =
    toNum(user.fd) +
    toNum(user.bonds) +
    toNum(user.gold) +
    toNum(user.nifty50) +
    toNum(user.midcap) +
    toNum(user.smallcap);

  const pfAssets =
    toNum(user.totalPF);

  const emergencyFund =
    toNum(user.emergencyFund);

  // ======================
  // CORE METRICS
  // ======================
  const monthlySurplus =
    income - expenses;

  const emergencyMonths =
    expenses > 0
      ? emergencyFund / expenses
      : 0;

  const debtRatio =
    income > 0
      ? (loans / income) * 100
      : 0;

  const totalAssets =
    investments +
    pfAssets +
    emergencyFund;

  const netWorth =
    totalAssets - loans;

  // ======================
  // RETIREMENT PREVIEW
  // ======================
  const age = toNum(user.age);
  const retirementAge =
    toNum(user.retirementAge) || 60;

  const yearsLeft =
    Math.max(0, retirementAge - age);

  const inflationRate = 0.06;

  const futureMonthlyNeed =
    futureCost(
      expenses,
      inflationRate,
      yearsLeft
    );

  const monthlyInvestmentPower =
    monthlySurplus > 0
      ? monthlySurplus * 0.6
      : 0;

  const projectedCorpus =
    sipFutureValue(
      monthlyInvestmentPower,
      0.12,
      yearsLeft * 12
    ) + totalAssets;

  // ======================
  // RISK LEVEL
  // ======================
  let financialRisk = "Low";

  if (
    monthlySurplus < 0 ||
    emergencyMonths < 3 ||
    debtRatio > 80
  ) {
    financialRisk = "High";
  } else if (
    emergencyMonths < 6 ||
    debtRatio > 40
  ) {
    financialRisk = "Medium";
  }

  // ======================
  // WEALTH SCORE
  // ======================
  let score =
    50 +
    monthlySurplus / 1000 +
    totalAssets / 100000 +
    emergencyMonths * 3 -
    debtRatio / 4;

  score = Math.max(
    10,
    Math.min(100, Math.round(score))
  );

  // ======================
  // ALERTS
  // ======================
  const alerts = [];

  if (monthlySurplus < 0)
    alerts.push(
      "Expenses exceed income"
    );

  if (emergencyMonths < 6)
    alerts.push(
      "Emergency fund below 6 months"
    );

  if (loans > 0)
    alerts.push(
      "Debt should be prioritized"
    );

  if (
    user.healthInsurance === "no"
  )
    alerts.push(
      "No health insurance detected"
    );

  if (
    user.termInsurance === "no"
  )
    alerts.push(
      "No term insurance detected"
    );

  // ======================
  // RECOMMENDATIONS
  // ======================
  const recommendations = [];

  if (loans > 0) {
    recommendations.push(
      "Use Avalanche strategy to clear loans first"
    );
  }

  if (monthlySurplus > 0) {
    recommendations.push(
      "Invest part of surplus monthly"
    );
  }

  if (emergencyMonths < 6) {
    recommendations.push(
      "Build 6-month emergency reserve"
    );
  }

  recommendations.push(
    "Review finances monthly"
  );

  return {
    income,
    expenses,
    monthlySurplus,
    loans,
    debtRatio: Number(
      debtRatio.toFixed(1)
    ),
    investments,
    pfAssets,
    emergencyFund,
    emergencyMonths: Number(
      emergencyMonths.toFixed(1)
    ),
    totalAssets,
    netWorth,
    futureMonthlyNeed: Math.round(
      futureMonthlyNeed
    ),
    projectedCorpus: Math.round(
      projectedCorpus
    ),
    yearsLeft,
    financialRisk,
    wealthScore: score,
    alerts,
    recommendations,
  };
}

module.exports = {
  analyzeFinance,
};