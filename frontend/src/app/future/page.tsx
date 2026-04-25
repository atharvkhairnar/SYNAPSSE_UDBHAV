"use client";

import { PiggyBank, Landmark, CalendarDays } from "lucide-react";

export default function FuturePage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">
          Retirement Planner
        </h1>

        <p className="text-gray-400 mb-10">
          Build future income with SIP + SWP strategy.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <Card
            icon={<CalendarDays />}
            title="Retirement Age"
            value="60 Years"
          />

          <Card
            icon={<PiggyBank />}
            title="Monthly SIP Needed"
            value="₹22,000"
          />

          <Card
            icon={<Landmark />}
            title="Target Corpus"
            value="₹2.8 Cr"
          />

        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            SWP After Retirement
          </h2>

          <p className="text-gray-300 mb-3">
            Estimated monthly withdrawal:
          </p>

          <p className="text-4xl font-bold text-emerald-300">
            ₹95,000/month
          </p>

          <p className="text-gray-400 mt-4">
            Designed for sustainable withdrawals while preserving capital.
          </p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-3xl p-6">
          <h3 className="text-2xl font-semibold mb-3">
            AI Insight
          </h3>

          <p className="text-gray-300">
            Increase SIP by 10% yearly to retire 6 years earlier.
          </p>
        </div>

      </div>
    </main>
  );
}

function Card({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <div className="text-emerald-300 mb-3">{icon}</div>
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}