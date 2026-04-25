import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "WealthPath",
  description: "AI Financial Planning Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0b0f19] text-white">
        <nav className="border-b border-white/10 sticky top-0 z-50 backdrop-blur bg-[#0b0f19]/80">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="text-2xl font-bold">
              Wealth<span className="text-emerald-400">Path</span>
            </Link>

            <div className="flex gap-5 text-sm text-gray-300">
              <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
              <Link href="/debt" className="hover:text-white">Debt</Link>
              <Link href="/investments" className="hover:text-white">Investments</Link>
              <Link href="/future" className="hover:text-white">Retirement</Link>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}