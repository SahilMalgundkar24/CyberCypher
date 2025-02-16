"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, Rocket, Stars, Zap } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with gradient and subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-20 animate-float">
        <Rocket className="w-12 h-12 text-blue-400 opacity-50" />
      </div>
      <div className="absolute bottom-20 right-20 animate-float-delayed">
        <Stars className="w-16 h-16 text-purple-400 opacity-50" />
      </div>
      <div className="absolute top-40 right-40 animate-float">
        <Zap className="w-8 h-8 text-yellow-400 opacity-50" />
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <main className="text-center max-w-4xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 tracking-tight">
              Transform Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Startup Dream{" "}
              </span>
              into Reality
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              "The journey of a thousand miles begins with a single step. Let AI
              be your guide on the path to startup success."
            </p>

            <div className="mt-12 animate-bounce-slow">
              <Button
                onClick={() => router.push("/startupinfo")}
                className="group relative text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-2 inline-block transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-xl bg-white bg-opacity-50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-blue-600 mb-4">
                  <Rocket className="w-8 h-8 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Launch Fast</h3>
                <p className="text-gray-600">
                  Get your startup off the ground quickly with AI-powered
                  insights
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white bg-opacity-50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-purple-600 mb-4">
                  <Stars className="w-8 h-8 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Scale Smart</h3>
                <p className="text-gray-600">
                  Make data-driven decisions to grow your business effectively
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white bg-opacity-50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-yellow-600 mb-4">
                  <Zap className="w-8 h-8 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovate Always</h3>
                <p className="text-gray-600">
                  Stay ahead of the curve with cutting-edge AI technology
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
