function toNum(value) {
  return Number(value || 0);
}

function buildDebtPlan(user) {
  const monthlyIncome =
    toNum(user.salary) +
    toNum(user.familyIncome) +
    toNum(user.sideIncome);

  const monthlyExpenses =
    toNum(user.rent) +
    toNum(user.electricity) +
    toNum(user.food) +
    toNum(user.milk) +
    toNum(user.fuel) +
    toNum(user.recharge) +
    toNum(user.misc);

  let monthlyPay =
    monthlyIncome - monthlyExpenses;

  if (monthlyPay < 1000) {
    monthlyPay = 1000;
  }

  const debts = [
    {
      name: "Credit Card Loan",
      amount: toNum(user.creditCardLoan),
    },
    {
      name: "Personal Loan",
      amount: toNum(user.personalLoan),
    },
    {
      name: "Bank Loan",
      amount: toNum(user.bankLoan),
    },
    {
      name: "Car Loan",
      amount: toNum(user.carLoan),
    },
    {
      name: "Home Loan",
      amount: toNum(user.homeLoan),
    },
  ].filter((d) => d.amount > 0);

  let timeline = [];
  let currentMonth = 1;

  debts.forEach((debt) => {
    const months = Math.ceil(
      debt.amount / monthlyPay
    );

    timeline.push({
      loan: debt.name,
      amount: debt.amount,
      startMonth: currentMonth,
      monthsRequired: months,
      finishMonth:
        currentMonth + months - 1,
      paymentPerMonth: monthlyPay,
    });

    currentMonth += months;
  });

  return {
    monthlyPayCapacity: monthlyPay,
    totalLoans: debts.reduce(
      (sum, d) => sum + d.amount,
      0
    ),
    totalMonths: currentMonth - 1,
    debtFreeYear:
      Math.ceil((currentMonth - 1) / 12),
    timeline,
  };
}

module.exports = {
  buildDebtPlan,
};