"use client";
import { use, useEffect, useState } from "react";

export default function Market({ searchParams }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = use(searchParams);
  const desc = params?.desc || "";

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/findCompetitors?business_idea=${desc}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setAnalysis(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching competitor data:", error);
        setLoading(false);
      });
  }, [desc]);

  if (loading)
    return <p className="text-center text-gray-700">Loading Report...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Market Analysis
        </h1>
        {analysis && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Feasibility Report
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <pre className="whitespace-pre-wrap">
                {analysis.feasibility_report}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
