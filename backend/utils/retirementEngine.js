function toNum(value) {
  return Number(value || 0);
}

function futureCost(current, inflation, years) {
  return current * Math.pow(1 + inflation, years);
}

function sipFutureValue(monthly, annualRate, months) {
  const r = annualRate / 12;

  if (r === 0) {
    return monthly * months;
  }

  return (
    monthly *
    ((Math.pow(1 + r, months) - 1) / r) *
    (1 + r)
  );
}

function buildRetirementPlan(user) {
  const age = toNum(user.age);
  const retirementAge =
    toNum(user.retirementAge) || 60;

  const yearsLeft = Math.max(
    0,
    retirementAge - age
  );

  const monthlyExpenses =
    toNum(user.rent) +
    toNum(user.electricity) +
    toNum(user.food) +
    toNum(user.milk) +
    toNum(user.fuel) +
    toNum(user.recharge) +
    toNum(user.misc);

  const currentAssets =
    toNum(user.fd) +
    toNum(user.bonds) +
    toNum(user.gold) +
    toNum(user.nifty50) +
    toNum(user.midcap) +
    toNum(user.smallcap) +
    toNum(user.totalPF);

  const inflation = 0.06;
  const growth = 0.12;
  const safeWithdrawRate = 0.04;

  const futureMonthlyNeed =
    futureCost(
      monthlyExpenses,
      inflation,
      yearsLeft
    );

  const annualNeed =
    futureMonthlyNeed * 12;

  const targetCorpus =
    annualNeed / safeWithdrawRate;

  const income =
    toNum(user.salary) +
    toNum(user.familyIncome) +
    toNum(user.sideIncome);

  const monthlySurplus =
    income - monthlyExpenses;

  const sipAmount =
    monthlySurplus > 0
      ? monthlySurplus * 0.5
      : 0;

  const projectedCorpus =
    sipFutureValue(
      sipAmount,
      growth,
      yearsLeft * 12
    ) + currentAssets;

  const gap =
    targetCorpus - projectedCorpus;

  const requiredSIP =
    yearsLeft > 0
      ? Math.max(
          0,
          gap / (yearsLeft * 12)
        )
      : 0;

  return {
    currentAge: age,
    retirementAge,
    yearsLeft,
    futureMonthlyNeed: Math.round(
      futureMonthlyNeed
    ),
    targetCorpus: Math.round(
      targetCorpus
    ),
    projectedCorpus: Math.round(
      projectedCorpus
    ),
    retirementGap: Math.round(
      gap > 0 ? gap : 0
    ),
    currentMonthlySIP: Math.round(
      sipAmount
    ),
    suggestedMonthlySIP:
      Math.round(requiredSIP),
    onTrack: gap <= 0,
  };
}

module.exports = {
  buildRetirementPlan,
};