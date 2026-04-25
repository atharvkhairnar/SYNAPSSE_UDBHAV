"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  Wallet,
  Shield,
  IndianRupee,
} from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/users")
      .then((res) => res.json())
      .then((data) => {
        const latestUser = data[data.length - 1];
        setUser(latestUser);
      });
  }, []);

  if (!user) {
    return (
      <main className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center">
        Loading Dashboard...
      </main>
    );
  }

  const income =
    Number(user.salary || 0) + Number(user.sideIncome || 0);

  const expenses =
    Number(user.rent || 0) +
    Number(user.food || 0) +
    Number(user.utilities || 0) +
    Number(user.transport || 0);

  const loans =
    Number(user.creditCardLoan || 0) +
    Number(user.personalLoan || 0) +
    Number(user.homeLoan || 0);

  const freeCash = income - expenses;

  const emergencyMonths =
    expenses > 0 ? (freeCash * 3) / expenses : 0;

  const score = Math.max(
    10,
    Math.min(
      100,
      Math.round((freeCash / income) * 100 + 50 - loans / 10000)
    )
  );

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">Wealth Dashboard</h1>
            <p className="text-gray-400 mt-2">
              Personalized financial command center
            </p>
          </div>

          <div className="px-5 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
            Wealth Score:
            <span className="text-emerald-300 font-bold ml-2">
              {score}/100
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-5">

          <Card
            title="Monthly Income"
            value={`₹${income}`}
            icon={<IndianRupee />}
          />

          <Card
            title="Expenses"
            value={`₹${expenses}`}
            icon={<Wallet />}
          />

          <Card
            title="Total Loans"
            value={`₹${loans}`}
            icon={<Shield />}
          />

          <Card
            title="Free Cashflow"
            value={`₹${freeCash}`}
            icon={<TrendingUp />}
          />

        </div>

        <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Smart Summary
          </h2>

          <p className="text-gray-300 mb-2">
            You can survive for{" "}
            <span className="text-emerald-300 font-bold">
              {emergencyMonths.toFixed(1)} months
            </span>
          </p>

          <p className="text-gray-300 mb-2">
            Suggested priority:
            <span className="text-yellow-300 ml-2">
              {loans > 0 ? "Clear Loans First" : "Start Investing"}
            </span>
          </p>

          <p className="text-gray-300">
            City: {user.city}
          </p>
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
      <div className="text-emerald-300 mb-3">{icon}</div>
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}