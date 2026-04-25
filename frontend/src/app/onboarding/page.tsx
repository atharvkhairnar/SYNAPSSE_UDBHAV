"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    age: "",
    city: "",
    familyMembers: "",
    salary: "",
    sideIncome: "",
    pf: "",
    rent: "",
    food: "",
    utilities: "",
    transport: "",
    creditCardLoan: "",
    personalLoan: "",
    homeLoan: "",
  });

  const next = () => setStep((prev) => Math.min(prev + 1, 4));
  const prev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        window.location.href = "/analysis";
      } else {
        alert("Failed to save data");
      }
    } catch (error) {
      alert("Backend connection failed");
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">Wealth Scan Setup</h1>

        <p className="text-gray-400 mb-8">Step {step} of 4</p>

        <div className="w-full h-2 bg-white/10 rounded-full mb-8">
          <div
            className="h-2 bg-emerald-400 rounded-full transition-all"
            style={{ width: `${step * 25}%` }}
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold">Personal Info</h2>

              <input name="age" placeholder="Age" className="input" onChange={handleChange} />
              <input name="city" placeholder="City" className="input" onChange={handleChange} />
              <input name="familyMembers" placeholder="Family Members" className="input" onChange={handleChange} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold">Income</h2>

              <input name="salary" placeholder="Monthly Salary" className="input" onChange={handleChange} />
              <input name="sideIncome" placeholder="Side Income" className="input" onChange={handleChange} />
              <input name="pf" placeholder="PF Deduction" className="input" onChange={handleChange} />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold">Expenses</h2>

              <input name="rent" placeholder="Rent" className="input" onChange={handleChange} />
              <input name="food" placeholder="Food" className="input" onChange={handleChange} />
              <input name="utilities" placeholder="Utilities" className="input" onChange={handleChange} />
              <input name="transport" placeholder="Transport" className="input" onChange={handleChange} />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold">Loans</h2>

              <input name="creditCardLoan" placeholder="Credit Card Loan" className="input" onChange={handleChange} />
              <input name="personalLoan" placeholder="Personal Loan" className="input" onChange={handleChange} />
              <input name="homeLoan" placeholder="Home Loan" className="input" onChange={handleChange} />
            </div>
          )}

          <div className="flex justify-between mt-10">
            <button
              onClick={prev}
              className="px-5 py-3 rounded-xl border border-white/10 hover:bg-white/10"
            >
              <ArrowLeft size={18} />
            </button>

            {step < 4 ? (
              <button
                onClick={next}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 flex items-center gap-2"
              >
                Next <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400"
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