
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  // Mock data (replace with API later)
  const stats = {
    total: 248,
    highRisk: 31,
    moderate: 67,
    avgTime: "1.4s",
  };

  const submissions = [
    {
      id: "ECG-2024-0041",
      date: "25 Mar 2024",
      type: "12-Lead",
      risk: "MODERATE",
      status: "Flagged",
    },
    {
      id: "ECG-2024-0040",
      date: "25 Mar 2024",
      type: "Holter",
      risk: "LOW",
      status: "Reviewed",
    },
    {
      id: "ECG-2024-0039",
      date: "24 Mar 2024",
      type: "12-Lead",
      risk: "HIGH",
      status: "Flagged",
    },
    {
      id: "ECG-2024-0038",
      date: "24 Mar 2024",
      type: "Resting",
      risk: "LOW",
      status: "Reviewed",
    },
  ];

  const alerts = [
    {
      id: "ECG-2024-0039",
      level: "High Risk",
      message: "ST elevation detected · Awaiting review",
    },
    {
      id: "ECG-2024-0037",
      level: "High Risk",
      message: "Ventricular tachycardia pattern",
    },
    {
      id: "ECG-2024-0041",
      level: "Moderate",
      message: "Possible atrial fibrillation · Flagged",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* NAVBAR */}
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">ECG Scan</h1>

        <nav className="flex gap-6 text-sm items-center">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>

          <Link href="/DashBoard" className="text-teal-400 font-medium">
            Dashboard
          </Link>

          <Link href="/SubmitEGC" className="text-gray-300 hover:text-white">
            Submit ECG
          </Link>

          <Link href="/Reports" className="text-gray-300 hover:text-white">
            Reports
          </Link>

          <button
            onClick={() => router.push("/login")}
            className="text-gray-300 hover:text-white"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* HEADER */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-gray-500 text-sm">
          Overview of ECG assessments — last 30 days
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
        <StatCard title="Total Submitted" value={stats.total} />

        <StatCard
          title="High Risk"
          value={stats.highRisk}
          highlight="red"
        />

        <StatCard
          title="Moderate Risk"
          value={stats.moderate}
          highlight="yellow"
        />

        <StatCard title="Avg Processing" value={stats.avgTime} />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* TABLE */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">Recent Submissions</h3>

            <button
              onClick={() => router.push("/reports")}
              className="text-teal-600 text-sm hover:underline"
            >
              View all →
            </button>
          </div>

          <table className="w-full text-sm">
            <thead className="text-gray-500 text-xs uppercase">
              <tr>
                <th className="p-3 text-left">Patient ID</th>
                <th>Date</th>
                <th>Record Type</th>
                <th>Risk Level</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((item, i) => (
                <tr
                  key={i}
                  onClick={() => router.push(`/reports/${item.id}`)}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-3 font-medium">{item.id}</td>
                  <td>{item.date}</td>
                  <td>{item.type}</td>
                  <td>
                    <Badge type={item.risk} />
                  </td>
                  <td className="text-gray-600">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ALERTS */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Active Alerts</h3>

            <button
              onClick={() => alert("Manage alerts")}
              className="text-teal-600 text-sm hover:underline"
            >
              Manage
            </button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className="border-l-4 border-red-400 bg-red-50 p-3 rounded-md"
              >
                <p className="text-sm font-semibold">
                  {alert.id} — {alert.level}
                </p>

                <p className="text-xs text-gray-600">
                  {alert.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* STAT CARD */

type StatCardProps = {
  title: string;
  value: string | number;
  highlight?: "red" | "yellow";
};

function StatCard({ title, value, highlight }: StatCardProps) {
  const color =
    highlight === "red"
      ? "text-red-600"
      : highlight === "yellow"
      ? "text-yellow-600"
      : "text-gray-900";

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-xs text-gray-500 uppercase">{title}</p>

      <p className={`text-2xl font-bold mt-1 ${color}`}>
        {value}
      </p>
    </div>
  );
}

/* BADGE */

type BadgeProps = {
  type: "HIGH" | "MODERATE" | "LOW";
};

function Badge({ type }: BadgeProps) {
  const styles: Record<BadgeProps["type"], string> = {
    HIGH: "bg-red-100 text-red-700",
    MODERATE: "bg-yellow-100 text-yellow-700",
    LOW: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold ${styles[type]}`}
    >
      {type}
    </span>
  );
}

