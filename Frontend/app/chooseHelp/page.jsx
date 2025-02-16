"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, MessageSquare, TrendingUp } from "lucide-react";

export default function StartupResourcesPage({ searchParams }) {
  const router = useRouter();
  const params = use(searchParams);
  const field = params?.field || "";
  const description = params?.description || "";

  const resources = [
    {
      title: "Connect with Founders",
      description:
        "Network with other founders in similar fields to share experiences and insights.",
      icon: <Users className="h-6 w-6" />,
      action: () => router.push("/founder"),
    },
    {
      title: "Find Angel Investors",
      description:
        "Discover angel investors interested in your specific field.",
      icon: <DollarSign className="h-6 w-6" />,
      action: () => console.log("Navigate to investor matching page"),
    },
    {
      title: "AI Decision Assistant",
      description: "Validate your decisions with our AI-powered chatbot.",
      icon: <MessageSquare className="h-6 w-6" />,
      action: () => router.push("/ai-decision-assistant"),
    },
    {
      title: "Market Trend Analysis",
      description:
        "Analyze current market trends to validate your startup idea.",
      icon: <TrendingUp className="h-6 w-6" />,
      action: () => console.log("Navigate to market analysis page"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Startup Resources
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {resource.icon}
                  <span>{resource.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {resource.description}
                </CardDescription>
                <Button onClick={resource.action} className="w-full">
                  Explore
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
