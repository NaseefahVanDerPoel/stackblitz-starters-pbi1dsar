"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ReportsPage() {
  const router = useRouter();

  // 🔹 Mock Data (replace with API later)
  const [reports, setReports] = useState([
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
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  // 🔍 Filter logic
  const filteredReports = reports.filter((r) => {
    const matchesSearch = r.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "ALL" || r.risk === filter;
    return matchesSearch && matchesFilter;
  });

  // 📤 Export single report
  const exportReport = (report) => {
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.id}.json`;
    a.click();
  };

  // 🔄 Mark as reviewed
  const markReviewed = (id) => {
    const updated = reports.map((r) =>
      r.id === id ? { ...r, status: "Reviewed" } : r
    );
    setReports(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* NAVBAR */}
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">ECG Scan</h1>

        <nav className="flex gap-6 text-sm items-center">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>

          <Link href="/DashBoard" className="text-gray-300 hover:text-white">
            Dashboard
          </Link>

          <Link href="/SubmitEGC" className="text-gray-300 hover:text-white">
            Submit ECG
          </Link>

          <Link href="/Reports" className="text-teal-400 font-medium">
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
        <h2 className="text-2xl font-semibold">ECG Reports</h2>
        <p className="text-gray-500 text-sm">
          View, filter and manage all ECG analysis results
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 px-6 mb-4">
        <input
          type="text"
          placeholder="Search by Patient ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/4"
        >
          <option value="ALL">All Risk Levels</option>
          <option value="HIGH">High Risk</option>
          <option value="MODERATE">Moderate</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white mx-6 rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="p-3 text-left">Patient ID</th>
              <th>Date</th>
              <th>Type</th>
              <th>Risk</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.map((r, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td
                  onClick={() => router.push(`/reports/${r.id}`)}
                  className="p-3 font-medium"
                >
                  {r.id}
                </td>

                <td>{r.date}</td>
                <td>{r.type}</td>

                <td>
                  <Badge type={r.risk} />
                </td>

                <td className="text-gray-600">{r.status}</td>

                <td className="flex gap-2 py-2">
                  <button
                    onClick={() => exportReport(r)}
                    className="text-xs bg-slate-900 text-white px-2 py-1 rounded"
                  >
                    Export
                  </button>

                  {r.status !== "Reviewed" && (
                    <button
                      onClick={() => markReviewed(r.id)}
                      className="text-xs bg-teal-600 text-white px-2 py-1 rounded"
                    >
                      Mark Reviewed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* BADGE COMPONENT */
function Badge({ type }) {
  const styles = {
    HIGH: "bg-red-100 text-red-700",
    MODERATE: "bg-yellow-100 text-yellow-700",
    LOW: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${styles[type]}`}>
      {type}
    </span>
  );
}