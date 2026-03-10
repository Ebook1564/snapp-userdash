"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { setClientName, setClientEmail, clientEmail, isLoading } = useUser();

  // Redirect if already logged in
  React.useEffect(() => {
    if (!isLoading && clientEmail) {
      router.push("/overview");
    }
  }, [clientEmail, isLoading, router]);

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
    <div className="min-h-screen w-full flex items-center justify-center bg-[#E5D9F2] p-4 sm:p-8">
      {/* Outer Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden min-h-[600px]">
        {/* Left Column - Welcome Message (Purple Area) */}
        <div className="relative flex-1 bg-gradient-to-br from-[#8C64C8] to-[#6A48A3] text-white p-12 lg:p-16 flex flex-col justify-center overflow-hidden">

          {/* Topography & Decorative elements */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {/* Approximate Topography Lines via SVG */}
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <path d="M-50,150 Q50,250 150,150 T450,150 T750,150" fill="none" stroke="white" strokeWidth="1" />
              <path d="M-50,120 Q80,220 180,120 T480,120 T780,120" fill="none" stroke="white" strokeWidth="1" />
              <path d="M-50,90 Q110,190 210,90 T510,90 T810,90" fill="none" stroke="white" strokeWidth="1" />
              <path d="M-50,450 Q50,350 150,450 T450,450 T750,450" fill="none" stroke="white" strokeWidth="1" />
              <path d="M-50,480 Q80,380 180,480 T480,480 T780,480" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="80%" cy="20%" r="5" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="20%" cy="80%" r="6" fill="none" stroke="white" strokeWidth="2" />
              <text x="30%" y="15%" fill="white" fontSize="20">+</text>
              <text x="60%" y="70%" fill="white" fontSize="24">+</text>
            </svg>
          </div>

          <div className="absolute top-12 right-12 opacity-30 pointer-events-none">
            {/* Dotted grid */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>
              ))}
            </div>
          </div>

          <div className="relative z-10 max-w-md">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Welcome back!</h1>
            <p className="text-lg text-white/90 font-light leading-relaxed">
              You can sign in to access with your existing account.
            </p>
          </div>
        </div>

        {/* Right Column - Login Form (White Area) */}
        <div className="flex-1 bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center">

          {/* Custom Logo Integration (Optional - top center usually) */}
          <div className="w-full flex justify-center mb-8">
            <Image src="/images/logo/s-logo.svg" alt="S Logo" width={60} height={60} />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">Sign In</h2>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100 flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username / Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <input
                type="text"
                placeholder="Username or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white text-gray-800 placeholder-gray-400 text-sm sm:text-base rounded-full py-3.5 pl-12 pr-4 border border-gray-200 focus:border-[#7b51b3] focus:ring-2 focus:ring-[#7b51b3]/20 outline-none transition-all"
                autoComplete="email"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white text-gray-800 placeholder-gray-400 text-sm sm:text-base rounded-full py-3.5 pl-12 pr-12 border border-gray-200 focus:border-[#7b51b3] focus:ring-2 focus:ring-[#7b51b3]/20 outline-none transition-all"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 font-medium py-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#7b51b3] focus:ring-[#7b51b3] cursor-pointer"
                />
                <span className="group-hover:text-gray-700 transition-colors">Remember me</span>
              </label>
              <Link href="/reset-password" className="hover:text-[#7b51b3] transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email || !password}
              className="w-full bg-[#7048A8] hover:bg-[#5D3A90] text-white rounded-full py-3.5 font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-md hover:shadow-lg flex justify-center items-center"
            >
              {isSubmitting ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8 font-medium">
            New here? <Link href="/signup" className="text-[#7b51b3] hover:text-[#5D3A90] transition-colors">Create an Account</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
