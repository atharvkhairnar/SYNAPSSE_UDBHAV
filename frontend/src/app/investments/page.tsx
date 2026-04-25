"use client";

import { TrendingUp, Shield, Gem, Landmark } from "lucide-react";

const investments = [
  {
    name: "Nifty50 Index",
    allocation: "40%",
    icon: <TrendingUp className="text-emerald-300" />,
  },
  {
    name: "Midcap100",
    allocation: "20%",
    icon: <TrendingUp className="text-blue-300" />,
  },
  {
    name: "Smallcap250",
    allocation: "10%",
    icon: <TrendingUp className="text-yellow-300" />,
  },
  {
    name: "Gold",
    allocation: "10%",
    icon: <Gem className="text-yellow-400" />,
  },
  {
    name: "Liquid / FD",
    allocation: "20%",
    icon: <Shield className="text-cyan-300" />,
  },
];

export default function InvestmentsPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">
          Smart Investment Plan
        </h1>

        <p className="text-gray-400 mb-10">
          Suggested monthly allocation after debt freedom.
        </p>

        <div className="space-y-5">
          {investments.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {item.icon}

                <div>
                  <h2 className="text-xl font-semibold">
                    {item.name}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Recommended category
                  </p>
                </div>
              </div>

              <div className="text-2xl font-bold text-emerald-300">
                {item.allocation}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-emerald-500/10 border border-emerald-400/20 rounded-3xl p-6">
          <h3 className="text-2xl font-semibold mb-3">
            AI Suggestion
          </h3>

          <p className="text-gray-300">
            Start SIP of ₹28,000/month. Increase by 10% yearly for stronger compounding.
          </p>

          <div className="mt-4 flex items-center gap-2 text-emerald-300">
            <Landmark size={18} />
            Potential Corpus ₹1.2Cr in 20 years
          </div>
        </div>

      </div>
    </main>
  );
}