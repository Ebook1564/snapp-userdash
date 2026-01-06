"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { setClientName, setClientEmail } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Call the login API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid email or password.");
        return;
      }

      // Prefer server-provided user values (from DB). Fall back to input email.
      const serverEmail: string | undefined = data?.user?.email;
      const serverName: string | undefined = data?.user?.name;

      const emailToUse = serverEmail || email;
      const nameToUse =
        serverName || emailToUse.split("@")[0].replace(/[._]/g, " ") || "Dashboard User";

      setClientName(nameToUse);
      setClientEmail(emailToUse);

      // Redirect to dashboard
      router.push("/overview");
    } catch (err) {
      console.error(err);
      setError("Something went wrong while signing in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full max-w-full overflow-x-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8"
      style={{ backgroundColor: "#1A0033" }}
    >
      {/* Login Card */}
      <div 
        className="w-full max-w-md rounded-2xl p-8 sm:p-10 lg:p-12 shadow-2xl"
        style={{ backgroundColor: "#2C2C4A" }}
      >
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white text-center mb-10 sm:mb-12">
          Login
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/20 border border-red-500/50">
            <p className="text-sm text-red-300 text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email Field */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              {/* Email Icon */}
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {/* Input with underline style */}
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-gray-300 placeholder-gray-500 text-base sm:text-lg focus:outline-none pb-2 border-b-2 border-gray-600 focus:border-white transition-colors"
                  autoComplete="email"
                />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              {/* Padlock Icon */}
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              {/* Input with underline style */}
              <div className="flex-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-gray-300 placeholder-gray-500 text-base sm:text-lg focus:outline-none pb-2 border-b-2 border-gray-600 focus:border-white transition-colors pr-10"
                  autoComplete="current-password"
                />
                {/* Show/Hide Password Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 bottom-2 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              href="/reset-password"
              className="text-sm sm:text-base text-gray-400 hover:text-gray-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting || !email || !password}
            className="w-full py-3 sm:py-4 rounded-xl text-white font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
            style={{ backgroundColor: "#5A5A7A" }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 pt-6 border-t border-gray-600/30 text-center">
          {/* <p className="text-sm sm:text-base text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Sign Up
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
}
