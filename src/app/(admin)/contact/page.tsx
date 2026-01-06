"use client";

import React, { useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { ChevronDownIcon } from "@/icons";

const inquiryTypeOptions = [
  { value: "partnership", label: "Partnership Inquiry" },
  { value: "sales", label: "Sales Question" },
  { value: "technical", label: "Technical Support" },
  { value: "feedback", label: "Feedback & Suggestions" },
  { value: "media", label: "Media Inquiry" },
  { value: "other", label: "Other" },
];

export default function ContactTeamPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    inquiryType: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        inquiryType: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
            Contact Our Team
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get in touch with our team. We're here to help with any questions
            or inquiries.
          </p>
        </div>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <div className="rounded-xl border border-success-200 bg-success-50 px-4 py-4 dark:border-success-500/30 dark:bg-success-500/10">
          <div className="flex items-center gap-2">
            <span className="text-success-600 dark:text-success-400">✓</span>
            <p className="text-sm font-medium text-success-800 dark:text-success-400">
              Message sent successfully! We'll get back to you soon.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white/90">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="Your company name"
                    value={formData.company}  
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="9194324235434"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="inquiryType">Inquiry Type *</Label>
                <div className="relative">
                  <Select
                    options={inquiryTypeOptions}
                    placeholder="Select inquiry type"
                    onChange={(value) =>
                      handleSelectChange("inquiryType", value)
                    }
                    defaultValue={formData.inquiryType}
                  />
                  <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <TextArea
                  rows={8}
                  placeholder="Please provide details about your inquiry..."
                  value={formData.message}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, message: value }))
                  }
                />
                <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                  Please include as much detail as possible to help us assist
                  you better.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      name: "",
                      email: "",
                      company: "",
                      phone: "",
                      inquiryType: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  disabled={isSubmitting}
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white/90">
              Contact Information
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <p className="mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Email
                </p>
                <a
                  href="mailto:support@novagamestudio.com"
                  className="text-brand-600 hover:text-brand-700 dark:text-brand-400"
                >
                  support@novagamestudio.com
                </a>
              </div>
              <div>
                <p className="mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </p>
                <a
                  href="tel:+1234567890"
                  className="text-brand-600 hover:text-brand-700 dark:text-brand-400"
                >
                  +1 (234) 567-8900
                </a>
              </div>
              <div>
                <p className="mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Business Hours
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Monday - Friday: 9:00 AM - 6:00 PM EST
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white/90">
              What to Expect
            </h3>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-success-500">✓</span>
                <span>Response within 24-48 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-success-500">✓</span>
                <span>Personalized assistance from our team</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-success-500">✓</span>
                <span>Follow-up support as needed</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-4 dark:border-brand-500/30 dark:bg-brand-500/10">
            <h3 className="mb-2 text-sm font-semibold text-brand-900 dark:text-brand-400">
              Quick Links
            </h3>
            <div className="space-y-2 text-xs">
              <a
                href="/docs"
                className="block text-brand-700 hover:text-brand-800 dark:text-brand-400"
              >
                → Documentation
              </a>
              <a
                href="/support"
                className="block text-brand-700 hover:text-brand-800 dark:text-brand-400"
              >
                → Support Center
              </a>
              <a
                href="/suggestions"
                className="block text-brand-700 hover:text-brand-800 dark:text-brand-400"
              >
                → Feature Suggestions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

