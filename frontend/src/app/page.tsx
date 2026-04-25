// app/page.tsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, TrendingUp, Wallet } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 blur-3xl" />

      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-wide">
          Wealth<span className="text-emerald-400">Path</span>
        </h1>

        <Link
          href="/onboarding"
          className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition font-medium"
        >
          Start Free
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-12 pt-20 pb-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            Your AI Financial <br />
            <span className="text-emerald-400">GPS for Life</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-6 text-lg text-gray-300 max-w-xl"
          >
            Eliminate debt, build emergency funds, and grow wealth with a smart
            AI-powered priority planner built for young earners.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/onboarding"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition font-semibold flex items-center gap-2"
            >
              Start My Wealth Scan <ArrowRight size={18} />
            </Link>

            <button className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">
              Live Demo
            </button>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            <StatCard title="₹2.3L" subtitle="Debt Saved" />
            <StatCard title="6 Mo." subtitle="Emergency Ready" />
            <StatCard title="+38%" subtitle="Growth Path" />
          </div>
        </div>

        {/* Right Side Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
        >
          <h3 className="text-2xl font-semibold mb-6">Financial Snapshot</h3>

          <div className="space-y-5">
            <FeatureRow
              icon={<Wallet className="text-emerald-400" />}
              title="Cash Flow Tracking"
              desc="Know where your money goes monthly."
            />

            <FeatureRow
              icon={<ShieldCheck className="text-blue-400" />}
              title="Emergency Shield"
              desc="Build 6 months survival reserve."
            />

            <FeatureRow
              icon={<TrendingUp className="text-yellow-400" />}
              title="Wealth Growth Plan"
              desc="Smart investment allocation roadmap."
            />
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
            <p className="text-sm text-gray-300">AI Verdict</p>
            <p className="mt-1 font-semibold text-emerald-300">
              Clear high-interest debt first, then invest ₹15k/month.
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function StatCard({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <p className="text-xl font-bold">{title}</p>
      <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}

function FeatureRow({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-400 mt-1">{desc}</p>
      </div>
    </div>
  );
}