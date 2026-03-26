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
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F3F0FF] p-4 sm:p-8 font-outfit">
      {/* Outer Card Container with entrance animation */}
      <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(123,81,179,0.15)] flex flex-col lg:flex-row overflow-hidden min-h-[650px] transform transition-all hover:shadow-[0_30px_60px_rgba(123,81,179,0.2)] animate-in fade-in zoom-in-95 duration-700">
        {/* Left Column - Welcome Message (Vibrant Purple Pane with Logo Watermark) */}
        <div className="relative flex-1 bg-gradient-to-br from-[#7B51B3] via-[#6A48A3] to-[#402C66] text-white p-12 lg:p-16 flex flex-col justify-center overflow-hidden">

          {/* Logo Watermark Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07]">
            <div className="absolute -right-20 -bottom-20 w-[600px] h-[600px] transform rotate-12 scale-150">
              <Image src="/images/logo/s-logo-exact.png" alt="Watermark" layout="fill" objectFit="contain" priority />
            </div>
            <div className="absolute -left-20 -top-20 w-[400px] h-[400px] transform -rotate-12 opacity-50">
              <Image src="/images/logo/s-logo-exact.png" alt="Watermark" layout="fill" objectFit="contain" priority />
            </div>
          </div>

          {/* Abstract Premium Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-md">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-purple-300 animate-ping"></span>
              <span className="text-sm font-medium tracking-wide">Secure Access</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]">
              Snappgames <br />
              <span className="text-purple-200 text-4xl lg:text-5xl">Business</span>
            </h1>
            <p className="text-xl text-white/80 font-light leading-relaxed mb-8 max-w-[280px]">
              Manage your partnerships and performance insights in one place.
            </p>
          </div>
        </div>

        {/* Right Column - Login Form (White Area) */}
        <div className="flex-1 bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center">

          {/* Custom Logo Integration - Plain style as requested */}
          <div className="w-full flex justify-center mb-10">
            <Image src="/images/logo/s-logo-exact.png" alt="S Logo" width={80} height={80} className="hover:scale-110 transition-transform duration-300 drop-shadow-xl" />
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Login</h2>
            <p className="text-gray-500 font-medium">Access your Snappgames Business account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 text-red-600 text-sm border border-red-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="p-1 bg-red-100 rounded-lg">
                <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="font-semibold leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username / Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#7B51B3] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <input
                type="text"
                placeholder="Username or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50/50 text-gray-900 border-none ring-1 ring-gray-200 placeholder-gray-400 text-base rounded-2xl py-4 pl-14 pr-4 focus:ring-2 focus:ring-[#7B51B3] focus:bg-white outline-none transition-all shadow-sm"
                autoComplete="email"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#7B51B3] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50/50 text-gray-900 border-none ring-1 ring-gray-200 placeholder-gray-400 text-base rounded-2xl py-4 pl-14 pr-14 focus:ring-2 focus:ring-[#7B51B3] focus:bg-white outline-none transition-all shadow-sm"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-[#7B51B3] transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
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
              className="w-full bg-gradient-to-r from-[#7B51B3] to-[#6A48A3] hover:from-[#6A48A3] hover:to-[#5D3A90] text-white rounded-2xl py-4 font-bold tracking-wide transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-6 shadow-[0_10px_20px_rgba(106,72,163,0.3)] hover:shadow-[0_15px_25px_rgba(106,72,163,0.4)] hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center"
            >
              {isSubmitting ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                "Login to Snappgames Business"
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
