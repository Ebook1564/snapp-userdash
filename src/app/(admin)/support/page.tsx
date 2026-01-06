"use client";

import React, { useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { ChevronDownIcon } from "@/icons";

const categoryOptions = [
  { value: "technical issue", label: "Technical Issue" },
  { value: "billing question", label: "Billing Question" },
  { value: "feature request", label: "Feature Request" },
  { value: "bug report", label: "Bug Report" },
  { value: "account issue", label: "Account Issue" },
  { value: "others", label: "Other" },
  { value: "game", label: "Game" },
];

export default function SupportCenterPage() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    description: "",
    game: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(false);
    setError(null);

    try {
      // Basic validation before calling API
      if (!formData.category) {
        setError("Please select a category.");
        setIsSubmitting(false);
        return;
      }
      if (!formData.description) {
        setError("Description is required.");
        setIsSubmitting(false);
        return;
      }

      // Build description (include subject + game)
      const fullDescription = `
Subject: ${formData.subject || "N/A"}
Game: ${formData.game || "N/A"}

Details:
${formData.description}
      `.trim();

      // Create FormData for submission (no file attachments)
      const formDataToSend = new FormData();
      
      // Append form fields
      formDataToSend.append("category", formData.category);
      formDataToSend.append("description", fullDescription);
      
      // Set null values for no attachment
      formDataToSend.append("attachment_filename", "null");
      formDataToSend.append("attachment_filetype", "null");
      formDataToSend.append("attachment_filesize", "null");

      const res = await fetch("/api/tickets", {
        method: "POST",
        body: formDataToSend,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to submit ticket.");
        setIsSubmitting(false);
        return;
      }

      const result = await res.json();
      
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          subject: "",
          category: "",
          description: "",
          game: "",
        });
        setError(null);
      }, 3000);

    } catch (err) {
      console.error("Error submitting ticket:", err);
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-none">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
            Support Center
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Submit a support ticket and our team will get back to you as soon as
            possible.
          </p>
        </div>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <div className="rounded-xl border border-success-200 bg-success-50 px-4 py-4 dark:border-success-500/30 dark:bg-success-500/10">
          <div className="flex items-center gap-2">
            <span className="text-success-600 dark:text-success-400">✓</span>
            <p className="text-sm font-medium text-success-800 dark:text-success-400">
              Support ticket submitted successfully! We'll respond within 24
              hours.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="w-full">
        {/* Support Form */}
        <div className="w-full">
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white/90">
              Submit a Support Ticket
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 w-full">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Brief description of your issue"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <div className="relative">
                  <Select
                    options={categoryOptions}
                    placeholder="Select category"
                    onChange={(value) =>
                      handleSelectChange("category", value)
                    }
                    defaultValue={formData.category}
                  />
                  <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="game">Game (Optional)</Label>
                <Input
                  type="text"
                  id="game"
                  name="game"
                  placeholder="Which game is this related to?"
                  value={formData.game}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <TextArea
                  rows={8}
                  placeholder="Please provide detailed information about your issue, including steps to reproduce if applicable..."
                  value={formData.description}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, description: value }))
                  }
                />
                <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                  The more details you provide, the faster we can help you.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? "Submitting..." : "Submit Ticket"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      subject: "",
                      category: "",
                      description: "",
                      game: "",
                    });
                    setError(null);
                    setIsSubmitted(false);
                  }}
                  disabled={isSubmitting}
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
