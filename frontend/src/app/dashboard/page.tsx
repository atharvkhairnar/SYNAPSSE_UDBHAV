"use client";

import { useEffect, useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  ShieldAlert,
  PiggyBank,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/report/latest")
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center">
        Loading Wealth Command Center...
      </main>
    );
  }

  const { summary, finance, debt, investments, retirement } = data;

  const expenseData = [
  {
    name: "Rent",
    value: Number(finance.rent || 0),
  },
  {
    name: "Electricity",
    value: Number(
      finance.electricity || 0
    ),
  },
  {
    name: "Food",
    value: Number(finance.food || 0),
  },
  {
    name: "Fuel",
    value: Number(finance.fuel || 0),
  },
  {
    name: "Misc",
    value: Number(finance.misc || 0),
  },
].filter(
  (item) => item.value > 0
);

const investData = Object.entries(
  investments.monthlyPlan || {}
).map(([name, value]) => ({
  name,
  value: Number(value),
}));

const retirementData = [
  {
    name: "Target",
    value: Number(
      retirement.targetCorpus || 0
    ),
  },
  {
    name: "Projected",
    value: Number(
      retirement.projectedCorpus || 0
    ),
  },
];

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#14b8a6",
];

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              Wealth Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Your complete financial operating system
            </p>
          </div>

          <div className="px-5 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
            Wealth Score:
            <span className="ml-2 text-emerald-300 text-2xl font-bold">
              {summary.wealthScore}
            </span>
          </div>
        </div>

        {/* Top Cards */}
        <div className="grid md:grid-cols-4 gap-5">

          <Card
            title="Income"
            value={`₹${finance.income}`}
            icon={<IndianRupee />}
          />

          <Card
            title="Expenses"
            value={`₹${finance.expenses}`}
            icon={<PiggyBank />}
          />

          <Card
            title="Monthly Surplus"
            value={`₹${finance.monthlySurplus}`}
            icon={<TrendingUp />}
          />

          <Card
            title="Risk Level"
            value={summary.risk}
            icon={<ShieldAlert />}
          />

        </div>

        {/* Main Sections */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {/* Debt */}
          <Section title="Debt Status">
            {debt.totalLoans > 0 ? (
              <>
                <Info label="Total Debt" value={`₹${debt.totalLoans}`} />
                <Info label="Debt Free In" value={`${debt.totalMonths} Months`} />
              </>
            ) : (
              <p className="text-emerald-300">
                Debt Free 🎉
              </p>
            )}
          </Section>

          {/* Investment */}
          <Section title="Investment Plan">
            <Info
              label="Investable Monthly"
              value={`₹${investments.investableAmount}`}
            />
            <Info
              label="Risk Profile"
              value={investments.riskProfile}
            />
            <Info
              label="Top Allocation"
              value="Nifty50"
            />
          </Section>

          {/* Retirement */}
          <Section title="Retirement Readiness">
            <Info
              label="Years Left"
              value={`${retirement.yearsLeft}`}
            />
            <Info
              label="Target Corpus"
              value={`₹${retirement.targetCorpus}`}
            />
            <Info
              label="On Track"
              value={
                retirement.onTrack
                  ? "Yes ✅"
                  : "No ⚠"
              }
            />
          </Section>

        </div>

               {/* Alerts + Recommendations */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <Section title="Alerts">
            {finance.alerts.length === 0 ? (
              <p className="text-gray-400">
                No active alerts
              </p>
            ) : (
              finance.alerts.map(
                (
                  item: string,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="flex gap-3 mb-3"
                  >
                    <AlertTriangle
                      className="text-yellow-400 mt-1"
                      size={18}
                    />
                    <p className="text-gray-300">
                      {item}
                    </p>
                  </div>
                )
              )
            )}
          </Section>

          <Section title="Recommendations">
            {finance.recommendations.map(
              (
                item: string,
                index: number
              ) => (
                <div
                  key={index}
                  className="flex gap-3 mb-3"
                >
                  <CheckCircle2
                    className="text-emerald-400 mt-1"
                    size={18}
                  />
                  <p className="text-gray-300">
                    {item}
                  </p>
                </div>
              )
            )}
          </Section>

        </div>


        {/* Charts Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {/* Expense Breakdown */}
          <Section title="Expense Breakdown">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    dataKey="value"
                    outerRadius={90}
                    label
                  >
                    {expenseData.map(
                      (_, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Section>

          {/* Monthly Allocation */}
          <Section title="Monthly Allocation">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={investData}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={90}
                    label
                  >
                    {investData.map(
                      (_, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Section>

          {/* Retirement Goal */}
          <Section title="Retirement Goal">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={retirementData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>

        </div>

      </div>
    </main>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
      <div className="text-emerald-300 mb-3">
        {icon}
      </div>
      <p className="text-gray-400 text-sm">
        {title}
      </p>
      <h3 className="text-2xl font-bold mt-2">
        {value}
      </h3>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-xl font-semibold mb-5">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="mb-3">
      <p className="text-gray-400 text-sm">
        {label}
      </p>
      <p className="font-semibold mt-1">
        {value}
      </p>
    </div>
  );
}