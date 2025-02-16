"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FounderPage() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/findMentors?business_idea=medicine&location=India"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setMentors(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching mentor data:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center text-gray-700">Loading mentors...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Connect with Founders
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle>{mentor.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{mentor.summary}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Source: {mentor.source}
                </p>
                <div className="mt-4">
                  <a
                    href={mentor.contact_info?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full">View Profile</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
