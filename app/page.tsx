'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'auth=; path=/; max-age=0';
    document.cookie = 'role=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* NAVBAR */}
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">ECG Scan</h1>

        <nav className="flex gap-6 text-sm items-center">
          <Link href="/" className="text-teal-400 font-medium">
            Home
          </Link>

          <Link href="/DashBoard" className="hover:text-teal-300">
            Dashboard
          </Link>

          <Link href="/SubmitEGC" className="hover:text-teal-300">
            Submit ECG
          </Link>

          <Link href="/Reports" className="hover:text-teal-300">
            Reports
          </Link>

          <button
            onClick={handleLogout}
            className="hover:text-red-400 font-medium"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold leading-tight">
          AI-Powered ECG Analysis for Faster Clinical Decisions
        </h2>

        <p className="mt-4 text-slate-600 text-lg">
          Upload ECG data, detect anomalies instantly, and generate
          clinical-grade reports using intelligent signal analysis.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/DashBoard"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/SubmitEGC"
            className="border border-slate-300 px-6 py-3 rounded-lg hover:bg-slate-100"
          >
            Submit ECG
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 pb-20 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <FeatureCard
          title="Real-time ECG Analysis"
          desc="Upload ECG files and get instant rhythm interpretation and anomaly detection."
        />
        <FeatureCard
          title="AI Risk Classification"
          desc="Automatically classify ECGs into low, moderate, and high-risk categories."
        />
        <FeatureCard
          title="Clinical Reports"
          desc="Generate structured medical reports with key metrics and interpretations."
        />
      </section>

      {/* SYSTEM OVERVIEW */}
      <section className="bg-white py-16 px-6 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold">How It Works</h3>

          <div className="mt-8 grid md:grid-cols-3 gap-6 text-left">
            <Step number="1" title="Upload ECG" />
            <Step number="2" title="AI Analysis Runs" />
            <Step number="3" title="Get Report Instantly" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white text-center py-6 mt-10">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} ECG Assess. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 border hover:shadow-md transition">
      <h4 className="font-semibold text-lg mb-2">{title}</h4>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function Step({ number, title }) {
  return (
    <div className="p-4 border rounded-lg bg-slate-50">
      <p className="text-teal-600 font-bold">Step {number}</p>
      <p className="font-medium">{title}</p>
    </div>
  );
}
