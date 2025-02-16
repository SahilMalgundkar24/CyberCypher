"use client";

import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export default function StartupInfoPage() {
  const router = useRouter();
  const [field, setField] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Using query parameters to pass data
    const encodedField = encodeURIComponent(field);
    const encodedDescription = encodeURIComponent(description);

    router.push(
      `/chooseHelp?field=${encodedField}&description=${encodedDescription}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Tell us about your startup
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            This information will help us provide tailored guidance for your
            journey.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="field"
                className="block text-sm font-medium text-gray-700"
              >
                Startup Field
              </label>
              <Select onValueChange={setField} required>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select your startup field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="health">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Startup Description
              </label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Briefly describe your startup idea..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
