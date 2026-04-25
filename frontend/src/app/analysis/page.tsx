"use client";

import { useEffect, useState } from "react";
import {
  Brain,
  Shield,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { useRouter } from "next/navigation";

const messages = [
  "Reading income patterns...",
  "Detecting money leaks...",
  "Analyzing debt pressure...",
  "Running growth simulations...",
  "Agents debating priorities...",
  "Generating WealthPath roadmap...",
];

export default function AnalysisPage() {
  const [step, setStep] = useState(0);
  const [report, setReport] = useState<any>(null);

  const router = useRouter();

  // Real backend call
  useEffect(() => {
    fetch(
      "http://127.0.0.1:5001/api/report/latest"
    )
      .then((res) => res.json())
      .then((data) => {
        setReport(data);
      })
      .catch(() => {
        setReport({});
      });
  }, []);

  // Animation steps
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (
          prev <
          messages.length - 1
        ) {
          return prev + 1;
        }
        return prev;
      });
    }, 1300);

    return () =>
      clearInterval(interval);
  }, []);

  // Redirect only after both ready
  useEffect(() => {
    if (
      step ===
        messages.length - 1 &&
      report
    ) {
      const timer =
        setTimeout(() => {
          router.push(
            "/dashboard"
          );
        }, 2200);

      return () =>
        clearTimeout(timer);
    }
  }, [step, report, router]);

  if (!report) {
    return (
      <main className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center">
        Loading Analysis...
      </main>
    );
  }

  const finance =
    report.finance || {};
  const debt =
    report.debt || {};

  const freeCash =
    finance.monthlySurplus || 0;

  const loans =
    debt.totalLoans || 0;

  const verdict =
    loans > 0
      ? "Prioritize loan closure first, protect emergency reserves, then accelerate investing."
      : "Debt-free profile detected. Begin growth-focused monthly investing immediately.";

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full" />

      <div className="max-w-5xl w-full relative z-10">

        {/* Header */}
        <div className="text-center mb-10">

          <div className="mx-auto mb-5 w-20 h-20 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin" />

          <h1 className="text-4xl font-bold">
            AI Wealth Analysis
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            {messages[step]}
          </p>

          {/* Progress */}
          <div className="w-full max-w-xl mx-auto h-2 bg-white/10 rounded-full mt-6">
            <div
              className="h-2 bg-emerald-400 rounded-full transition-all duration-700"
              style={{
                width: `${
                  ((step + 1) /
                    messages.length) *
                  100
                }%`,
              }}
            />
          </div>

        </div>

        {/* Debate Panels */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-yellow-400" />
              <h2 className="text-xl font-semibold">
                Agent Growth
              </h2>
            </div>

            <p className="text-gray-300">
              Monthly free cashflow of ₹
              {freeCash}. Strong opportunity for compounding if deployed consistently.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-blue-400" />
              <h2 className="text-xl font-semibold">
                Agent Safety
              </h2>
            </div>

            <p className="text-gray-300">
              Total liabilities of ₹
              {loans}. Maintain reserves and reduce future risk exposure.
            </p>

          </div>

        </div>

        {/* Verdict */}
        <div className="mt-8 bg-emerald-500/10 border border-emerald-400/20 rounded-3xl p-6 text-center">

          <div className="flex justify-center mb-3">
            <Brain className="text-emerald-300" />
          </div>

          <h3 className="text-xl font-semibold mb-2">
            Final Hybrid Verdict
          </h3>

          <p className="text-gray-300">
            {verdict}
          </p>

          {finance.expenses >
            finance.income && (
            <p className="text-red-400 mt-4 flex justify-center gap-2">
              <AlertTriangle size={18} />
              Expenses exceed income
            </p>
          )}

        </div>

      </div>
    </main>
  );
}