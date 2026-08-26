"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // 🔐 Mock authentication (replace later with backend)
    if (email === "admin@ecg.com" && password === "admin123") {
      document.cookie = "auth=true; path=/";
      document.cookie = "role=admin; path=/";
      router.push("/dashboard");
    } else if (email === "user@ecg.com" && password === "user123") {
      document.cookie = "auth=true; path=/";
      document.cookie = "role=user; path=/";
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow w-80">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Login to ECG System
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-6 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-teal-600 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}