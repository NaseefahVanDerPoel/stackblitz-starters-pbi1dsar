// app/components/EcgUploader.jsx
'use client';
import { useState } from 'react';

export default function EcgUploader() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('https://girdle-jolt-judgingly.ngrok-free.dev/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Prediction failed:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {loading && <p>Analyzing ECG...</p>}
      {result && (
        <div>
          <p>
            <strong>Prediction:</strong> {result.prediction}
          </p>
          <p>
            <strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  );
}
