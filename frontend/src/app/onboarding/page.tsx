"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Scale,
  Rocket,
} from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  const totalSteps = 7;

  const [formData, setFormData] = useState({
    // Personal
    age: "",
    city: "",
    familyMembers: "",

    // Income
    salary: "",
    familyIncome: "",
    sideIncome: "",
    monthlyPF: "",
    totalPF: "",
    usePF: "no",

    // Expenses
    rent: "",
    electricity: "",
    food: "",
    milk: "",
    fuel: "",
    recharge: "",
    misc: "",

    // Loans
    creditCardLoan: "",
    personalLoan: "",
    bankLoan: "",
    carLoan: "",
    homeLoan: "",

    // Investments
    fd: "",
    bonds: "",
    gold: "",
    nifty50: "",
    midcap: "",
    smallcap: "",

    // Protection
    healthInsurance: "no",
    lifeInsurance: "no",
    termInsurance: "no",
    emergencyFund: "",

    // Goals
    retirementAge: "",
    riskLevel: "balanced",
  });

  const next = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClass =
    "w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-emerald-400";

  const labelClass = "block text-sm text-gray-300 mb-2";

  const Hint = ({ text }: { text: string }) => (
    <p className="text-xs text-gray-500 mt-1">{text}</p>
  );

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">WealthPath Setup</h1>
          <p className="text-gray-400 mt-2">
            Step {step} of {totalSteps}
          </p>
        </div>

        {/* Progress */}
        <div className="w-full h-2 bg-white/10 rounded-full mb-10">
          <div
            className="h-2 bg-emerald-400 rounded-full transition-all duration-500"
            style={{
              width: `${(step / totalSteps) * 100}%`,
            }}
          />
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">
                Personal Profile
              </h2>

              <div>
                <label className={labelClass}>Age</label>
                <input
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label className={labelClass}>City</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Mumbai, Pune, Bangalore..."
                />
                <Hint text="Used to estimate cost of living & inflation." />
              </div>

              <div>
                <label className={labelClass}>
                  Family Members
                </label>
                <input
                  name="familyMembers"
                  value={formData.familyMembers}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Total household members"
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">
                Income & PF
              </h2>

              <div>
                <label className={labelClass}>
                  Monthly Salary (₹)
                </label>
                <input
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Post-tax monthly income"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Family Income (₹)
                </label>
                <input
                  name="familyIncome"
                  value={formData.familyIncome}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Optional household income"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Side Income (₹)
                </label>
                <input
                  name="sideIncome"
                  value={formData.sideIncome}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Freelance / rental / extra income"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Monthly PF Cut (₹)
                </label>
                <input
                  name="monthlyPF"
                  value={formData.monthlyPF}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Total PF Corpus (₹)
                </label>
                <input
                  name="totalPF"
                  value={formData.totalPF}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Use PF in planning?
                </label>
                <select
                  name="usePF"
                  value={formData.usePF}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">
                Monthly Expenses
              </h2>

              <div>
                <label className={labelClass}>Rent (₹)</label>
                <input name="rent" value={formData.rent} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Electricity (₹)</label>
                <input name="electricity" value={formData.electricity} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Food (₹)</label>
                <input name="food" value={formData.food} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Milk (₹)</label>
                <input name="milk" value={formData.milk} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Fuel (₹)</label>
                <input name="fuel" value={formData.fuel} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Recharge (₹)</label>
                <input name="recharge" value={formData.recharge} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Misc (₹)</label>
                <input name="misc" value={formData.misc} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">
                Loans & Liabilities
              </h2>

              <div>
                <label className={labelClass}>
                  Credit Card Loan (₹)
                </label>
                <input name="creditCardLoan" value={formData.creditCardLoan} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>
                  Personal Loan (₹)
                </label>
                <input name="personalLoan" value={formData.personalLoan} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>
                  Bank Loan (₹)
                </label>
                <input name="bankLoan" value={formData.bankLoan} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>
                  Car Loan (₹)
                </label>
                <input name="carLoan" value={formData.carLoan} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>
                  Home Loan (₹)
                </label>
                <input name="homeLoan" value={formData.homeLoan} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          )}

                    {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">
                Current Investments
              </h2>

              <div>
                <label className={labelClass}>FD Amount (₹)</label>
                <input name="fd" value={formData.fd} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Corporate Bonds (₹)</label>
                <input name="bonds" value={formData.bonds} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Gold (₹)</label>
                <input name="gold" value={formData.gold} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Nifty50 (₹)</label>
                <input name="nifty50" value={formData.nifty50} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Midcap (₹)</label>
                <input name="midcap" value={formData.midcap} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Smallcap (₹)</label>
                <input name="smallcap" value={formData.smallcap} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">
                Protection & Safety
              </h2>

              <div>
                <label className={labelClass}>
                  Health Insurance
                </label>
                <select
                  name="healthInsurance"
                  value={formData.healthInsurance}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Life Insurance
                </label>
                <select
                  name="lifeInsurance"
                  value={formData.lifeInsurance}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Term Insurance
                </label>
                <select
                  name="termInsurance"
                  value={formData.termInsurance}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Emergency Fund (₹)
                </label>
                <input
                  name="emergencyFund"
                  value={formData.emergencyFund}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Reserved cash amount"
                />
              </div>
            </div>
          )}

          {/* STEP 7 */}
          {step === 7 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">
                Goals & Risk Profile
              </h2>

              <div>
                <label className={labelClass}>
                  Retirement Age
                </label>
                <input
                  name="retirementAge"
                  value={formData.retirementAge}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="55 / 60 / 65"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Risk Preference
                </label>

                <div className="grid md:grid-cols-3 gap-4 mt-3">

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        riskLevel: "conservative",
                      })
                    }
                    className={`rounded-2xl border p-4 text-left ${
                      formData.riskLevel === "conservative"
                        ? "border-emerald-400 bg-emerald-500/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <Shield className="mb-3 text-emerald-300" />
                    <p className="font-semibold">
                      Conservative
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        riskLevel: "balanced",
                      })
                    }
                    className={`rounded-2xl border p-4 text-left ${
                      formData.riskLevel === "balanced"
                        ? "border-emerald-400 bg-emerald-500/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <Scale className="mb-3 text-yellow-300" />
                    <p className="font-semibold">
                      Balanced
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        riskLevel: "aggressive",
                      })
                    }
                    className={`rounded-2xl border p-4 text-left ${
                      formData.riskLevel === "aggressive"
                        ? "border-emerald-400 bg-emerald-500/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <Rocket className="mb-3 text-red-300" />
                    <p className="font-semibold">
                      Aggressive
                    </p>
                  </button>

                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-10">

            <button
              onClick={prev}
              className="px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/10"
            >
              <ArrowLeft size={18} />
            </button>

            {step < totalSteps ? (
              <button
                onClick={next}
                className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 flex items-center gap-2"
              >
                Next <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={async () => {
                  try {
                    const res = await fetch(
                      "http://127.0.0.1:5001/api/users",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type":
                            "application/json",
                        },
                        body: JSON.stringify(formData),
                      }
                    );

                    if (res.ok) {
                      window.location.href =
                        "/analysis";
                    } else {
                      alert("Failed to save data");
                    }
                  } catch {
                    alert("Backend connection failed");
                  }
                }}
                className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400"
              >
                Analyze My Wealth
              </button>
            )}

          </div>

        </div>
      </div>
    </main>
  );
}