"use client";

import { CheckCircle, ArrowRight } from "lucide-react";

const timeline = [
  {
    month: "Month 1 - 4",
    title: "Clear Credit Card Debt",
    amount: "₹18,000/month",
    saved: "High interest removed",
  },
  {
    month: "Month 5 - 10",
    title: "Close Personal Loan",
    amount: "₹24,000/month",
    saved: "EMI redirected",
  },
  {
    month: "Month 11+",
    title: "Start Investing",
    amount: "₹28,000/month SIP",
    saved: "Wealth creation begins",
  },
];

export default function DebtPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">
          Debt Freedom Timeline
        </h1>

        <p className="text-gray-400 mb-10">
          Avalanche strategy prioritizing highest-interest debt first.
        </p>

        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-6"
            >
              <p className="text-emerald-300 text-sm mb-2">
                {item.month}
              </p>

              <h2 className="text-2xl font-semibold mb-2">
                {item.title}
              </h2>

              <p className="text-gray-300">{item.amount}</p>

              <div className="mt-4 flex items-center gap-2 text-gray-400">
                <CheckCircle size={18} className="text-emerald-400" />
                {item.saved}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-emerald-500/10 border border-emerald-400/20 rounded-3xl p-6">
          <h3 className="text-2xl font-semibold mb-3">
            Final Result
          </h3>

          <p className="text-gray-300">
            Debt free in 10 months. Then ₹28,000 monthly wealth building starts.
          </p>

          <div className="mt-4 flex items-center gap-2 text-emerald-300">
            Interest Saved ₹1.3L <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </main>
  );
}