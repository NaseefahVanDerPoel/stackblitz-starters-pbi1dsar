'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const API_URL = 'https://repository-name-ecg-api.onrender.com';

export default function SubmitECG() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [patientId, setPatientId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleLogout = () => {
    document.cookie = 'auth=; path=/; max-age=0';
    document.cookie = 'role=; path=/; max-age=0';
    router.push('/login');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setResult(null);
    setError('');
  };

  const handleAnalyse = async () => {
    if (!file) {
      setError('Please select an ECG image first.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();

    // IMPORTANT:
    // This name must match:
    // file: UploadFile = File(...)
    // in your FastAPI /predict endpoint.
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`Server error ${response.status}: ${responseText}`);
      }

      const data = JSON.parse(responseText);

      setResult(data);
    } catch (err: any) {
      console.error('ECG analysis failed:', err);

      setError(
        err?.message ||
          'Could not analyse ECG. Please check that the model server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* NAVBAR */}
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">ECG Scan</h1>

        <nav className="flex gap-6 text-sm items-center">
          <Link href="/" className="hover:text-teal-300">
            Home
          </Link>

          <Link href="/DashBoard" className="hover:text-teal-300">
            Dashboard
          </Link>

          <Link href="/SubmitEGC" className="text-teal-400 font-medium">
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

      {/* PAGE */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SUBMISSION CARD */}
          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold">Submit ECG Record</h2>

            <p className="text-slate-500 mt-2 text-sm">
              Upload an ECG image for AI-powered anomaly detection.
            </p>

            {/* FILE UPLOAD */}
            <div className="mt-6">
              <label
                htmlFor="ecg-file"
                className="border-2 border-dashed border-teal-500 bg-teal-50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-teal-100 transition"
              >
                {file ? (
                  <>
                    <p className="font-semibold text-teal-700">{file.name}</p>

                    <p className="text-sm text-slate-500 mt-2">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-slate-700">
                      Click to upload ECG
                    </p>

                    <p className="text-sm text-slate-500 mt-2">
                      .png .jpg .jpeg (ECG plot image)
                    </p>
                  </>
                )}
              </label>

              <input
                id="ecg-file"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* PATIENT ID */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">
                Patient ID
              </label>

              <input
                type="text"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="Enter patient ID"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* ANALYSE BUTTON */}
            <button
              onClick={handleAnalyse}
              disabled={loading || !file}
              className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Analysing ECG...' : 'Analyse ECG'}
            </button>

            {/* ERROR */}
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
                <strong>Analysis failed:</strong>
                <p className="mt-1 break-words">{error}</p>
              </div>
            )}
          </section>

          {/* RESULT CARD */}
          <section className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Anomaly Report</h2>

                <p className="text-slate-500 text-sm mt-1">
                  AI analysis results
                </p>
              </div>
            </div>

            {!result && !loading && (
              <div className="mt-10 text-center text-slate-500">
                <p>Submit an ECG image to see the model's prediction here.</p>
              </div>
            )}

            {loading && (
              <div className="mt-10 text-center">
                <div className="animate-pulse">
                  <p className="text-teal-600 font-semibold">
                    Analysing ECG...
                  </p>

                  <p className="text-sm text-slate-500 mt-2">
                    The AI model is processing your ECG image.
                  </p>
                </div>
              </div>
            )}

            {result && (
              <div className="mt-6 space-y-5">
                {/* PATIENT */}
                {patientId && (
                  <div className="border-b pb-4">
                    <p className="text-xs text-slate-500 uppercase">
                      Patient ID
                    </p>

                    <p className="font-semibold mt-1">{patientId}</p>
                  </div>
                )}

                {/* PREDICTION */}
                <div className="bg-slate-50 rounded-lg p-5">
                  <p className="text-xs text-slate-500 uppercase">Prediction</p>

                  <p
                    className={`text-2xl font-bold mt-1 ${
                      result.prediction === 'NORM'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {result.prediction}
                  </p>
                </div>

                {/* CONFIDENCE */}
                <div className="bg-slate-50 rounded-lg p-5">
                  <p className="text-xs text-slate-500 uppercase">Confidence</p>

                  <p className="text-2xl font-bold mt-1 text-teal-600">
                    {typeof result.confidence === 'number'
                      ? `${(result.confidence * 100).toFixed(1)}%`
                      : 'N/A'}
                  </p>
                </div>

                {/* PROBABILITIES */}
                {result.probabilities && (
                  <div>
                    <h3 className="font-semibold mb-3">
                      Classification Probabilities
                    </h3>

                    <div className="space-y-3">
                      {Object.entries(result.probabilities).map(
                        ([label, probability]) => {
                          const value = Number(probability);

                          return (
                            <div key={label}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{label}</span>

                                <span className="font-medium">
                                  {(value * 100).toFixed(1)}%
                                </span>
                              </div>

                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                  className="bg-teal-600 h-2 rounded-full"
                                  style={{
                                    width: `${value * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}

                {/* FILE */}
                {result.filename && (
                  <div className="border-t pt-4">
                    <p className="text-xs text-slate-500">Analysed file</p>

                    <p className="text-sm font-medium mt-1">
                      {result.filename}
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white text-center py-6 mt-10">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} ECG Assess. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
