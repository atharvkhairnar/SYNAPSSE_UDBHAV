function toNum(value) {
  return Number(value || 0);
}

function buildDebtPlan(user) {
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

  const monthlyExpenses =
    expenses;

  const emergencyMonths =
    monthlyExpenses > 0
      ? emergencyFund /
        monthlyExpenses
      : 0;

  let surplus =
    income - expenses;

  if (surplus < 0) surplus = 0;

  let payCapacity =
    emergencyMonths < 3
      ? surplus * 0.7
      : surplus * 0.9;

  payCapacity = Math.max(
    1000,
    Math.round(payCapacity)
  );

  const debts = [
    {
      name: "Credit Card Loan",
      amount: toNum(
        user.creditCardLoan
      ),
      priority: 1,
      reason:
        "Highest interest unsecured debt",
    },
    {
      name: "Personal Loan",
      amount: toNum(
        user.personalLoan
      ),
      priority: 2,
      reason:
        "High interest loan",
    },
    {
      name: "Bank Loan",
      amount: toNum(
        user.bankLoan
      ),
      priority: 3,
      reason:
        "Mid priority liability",
    },
    {
      name: "Car Loan",
      amount: toNum(
        user.carLoan
      ),
      priority: 4,
      reason:
        "Asset-backed liability",
    },
    {
      name: "Home Loan",
      amount: toNum(
        user.homeLoan
      ),
      priority: 5,
      reason:
        "Usually lowest rate / tax benefit",
    },
  ]
    .filter((d) => d.amount > 0)
    .sort(
      (a, b) =>
        a.priority -
        b.priority
    );

  let timeline = [];
  let currentMonth = 1;

  debts.forEach((debt) => {
    const months = Math.ceil(
      debt.amount /
        payCapacity
    );

    timeline.push({
      loan: debt.name,
      amount: debt.amount,
      startMonth:
        currentMonth,
      monthsRequired:
        months,
      finishMonth:
        currentMonth +
        months -
        1,
      paymentPerMonth:
        payCapacity,
      reason:
        debt.reason,
    });

    currentMonth += months;
  });

  const totalLoans =
    debts.reduce(
      (sum, d) =>
        sum + d.amount,
      0
    );

  return {
    strategy:
      "Avalanche Method",
    monthlyPayCapacity:
      payCapacity,
    reserveProtection:
      emergencyMonths < 3
        ? "Enabled"
        : "Healthy",
    emergencyMonths:
      Number(
        emergencyMonths.toFixed(
          1
        )
      ),
    totalLoans,
    totalMonths:
      currentMonth - 1,
    debtFreeYear:
      Math.ceil(
        (currentMonth - 1) /
          12
      ),
    nextLoan:
      debts.length > 0
        ? debts[0].name
        : "Debt Free",
    explanation:
      debts.length > 0
        ? debts[0].reason
        : "No debt remaining",
    timeline,
  };
}

module.exports = {
  buildDebtPlan,
};