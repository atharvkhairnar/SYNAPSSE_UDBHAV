function toNum(value) {
  return Number(value || 0);
}

function futureValue(
  amount,
  rate,
  years
) {
  return (
    amount *
    Math.pow(
      1 + rate,
      years
    )
  );
}

function sipFutureValue(
  monthly,
  annualRate,
  months
) {
  const r =
    annualRate / 12;

  if (r === 0) {
    return (
      monthly * months
    );
  }

  return (
    monthly *
    (
      (Math.pow(
        1 + r,
        months
      ) - 1) / r
    ) *
    (1 + r)
  );
}

function buildRetirementPlan(
  user
) {
  const age =
    toNum(user.age);

  const retirementAge =
    toNum(
      user.retirementAge
    ) || 60;

  const yearsLeft =
    Math.max(
      0,
      retirementAge - age
    );

  const monthlyExpenses =
    toNum(user.rent) +
    toNum(
      user.electricity
    ) +
    toNum(user.food) +
    toNum(user.milk) +
    toNum(user.fuel) +
    toNum(
      user.recharge
    ) +
    toNum(user.misc);

  const currentAssets =
    toNum(user.fd) +
    toNum(user.bonds) +
    toNum(user.gold) +
    toNum(
      user.nifty50
    ) +
    toNum(
      user.midcap
    ) +
    toNum(
      user.smallcap
    ) +
    toNum(
      user.totalPF
    );

  const income =
    toNum(user.salary) +
    toNum(
      user.familyIncome
    ) +
    toNum(
      user.sideIncome
    );

  let monthlySurplus =
    income -
    monthlyExpenses;

  if (
    monthlySurplus < 0
  ) {
    monthlySurplus = 0;
  }

  const inflation =
    0.06;

  const growth =
    0.12;

  const safeWithdraw =
    0.04;

  const futureMonthlyNeed =
    futureValue(
      monthlyExpenses,
      inflation,
      yearsLeft
    );

  const annualNeed =
    futureMonthlyNeed *
    12;

  const targetCorpus =
    annualNeed /
    safeWithdraw;

  const currentMonthlySIP =
    Math.round(
      monthlySurplus *
        0.5
    );

  const projectedCorpus =
    Math.round(
      sipFutureValue(
        currentMonthlySIP,
        growth,
        yearsLeft * 12
      ) +
        futureValue(
          currentAssets,
          growth,
          yearsLeft
        )
    );

  let gap =
    targetCorpus -
    projectedCorpus;

  if (gap < 0) {
    gap = 0;
  }

  const extraMonthlySIP =
    yearsLeft > 0
      ? Math.round(
          gap /
            (yearsLeft *
              12)
        )
      : 0;

  const swpMonthly =
    Math.round(
      targetCorpus *
        safeWithdraw /
        12
    );

  const onTrack =
    gap === 0;

  let strategy =
    "You are on a healthy retirement path.";

  if (!onTrack) {
    strategy =
      "Increase monthly SIP and reduce leakages to close retirement gap.";
  }

  return {
    currentAge: age,
    retirementAge,
    yearsLeft,
    futureMonthlyNeed:
      Math.round(
        futureMonthlyNeed
      ),
    targetCorpus:
      Math.round(
        targetCorpus
      ),
    projectedCorpus,
    retirementGap:
      Math.round(gap),
    currentMonthlySIP,
    suggestedMonthlySIP:
      extraMonthlySIP,
    swpMonthlyIncome:
      swpMonthly,
    onTrack,
    strategy,
  };
}

module.exports = {
  buildRetirementPlan,
};