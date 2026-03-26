"use client";

import React, { useState, useEffect } from "react";

const sections = [
  { id: "introduction", title: "👋 Introduction", icon: "👋" },
  { id: "getting-started", title: "🚀 Getting Started", icon: "🚀" },
  { id: "our-products", title: "📦 Our Products", icon: "📦" },
  { id: "integration-guide", title: "🛠️ Integration Guide", icon: "🛠️" },
  { id: "rev-share", title: "💰 Revenue Sharing", icon: "💰" },
  { id: "faq", title: "❓ FAQ", icon: "❓" },
];

export default function DeveloperDocPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="flex gap-10 pb-20 font-sans max-w-7xl mx-auto">
      {/* Sticky Sidebar Navigation */}
      <aside className="w-64 hidden lg:block">
        <div className="sticky top-24 space-y-1">
          <h3 className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Documentation</h3>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeSection === section.id
                  ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                }`}
            >
              {section.title}
            </button>
          ))}
          <div className="mt-10 px-4">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
              <h4 className="text-[11px] font-bold text-blue-700 dark:text-blue-400 uppercase mb-2">Need help?</h4>
              <p className="text-[10px] text-blue-600 dark:text-blue-300 leading-relaxed mb-3">
                Join our developer community or contact our support team.
              </p>
              <button className="text-[10px] font-bold text-blue-700 dark:text-blue-400 hover:underline">
                CONTACT SUPPORT →
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 space-y-24 max-w-3xl">
        {/* Introduction Section */}
        <section id="introduction" className="space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">👋 Introduction</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Welcome to the <span className="font-bold text-orange-500">SnappGames Business</span> Publisher integration documents.
            Explore our guides and examples to integrate high-engagement content directly within your application
            or website.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">About SnappGames</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              At SnappGames, we are building one of the world&apos;s largest distribution networks for digital casual content.
              Since 2015, we&apos;ve focused on delivering premium HTML5 experiences (instant games) that publishers
              can embed seamlessly. Our partners benefit from significantly higher engagement, retention,
              and a robust ad-revenue sharing program.
            </p>
          </div>
        </section>

        {/* Getting Started Section */}
        <section id="getting-started" className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">🚀 Getting Started</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Follow these simple steps to begin monetizing your platform with SnappGames.
          </p>
          <div className="space-y-4">
            {[
              { step: 1, title: "Sign Up", desc: "Create your publisher account on the SnappGames Business portal." },
              { step: 2, title: "Submit Property", desc: "Register your website or mobile app details for review." },
              { step: 3, title: "Obtain Property ID", desc: "Once approved, you'll receive a unique ID needed for integration." },
              { step: 4, title: "Go Live", desc: "Embed the SDK or iframe and start earning through our content!" }
            ].map((s) => (
              <div key={s.step} className="flex gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-white/[0.02]">
                <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {s.step}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{s.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Product Verticals Section */}
        <section id="our-products" className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">📦 Our Products</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            SnappGames offers multiple content verticals designed for different user interests.
            Each can be integrated independently or as a unified suite.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Games", desc: "100+ premium HTML5 instant games across all genres.", color: "text-blue-500" },
              { name: "Quizzes", desc: "Hundreds of popular categories like Tech, Business, and Logos.", color: "text-purple-500" },
              { name: "News", desc: "Access the latest global news and trending stories.", color: "text-green-500" },
              { name: "Astrology", desc: "Western, Vedic, Tarot, and daily Horoscopes.", color: "text-orange-500" }
            ].map((p) => (
              <div key={p.name} className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-white/[0.01] hover:shadow-md transition-shadow">
                <h4 className={`text-sm font-bold ${p.color} uppercase tracking-tight mb-2 underline decoration-2 underline-offset-4`}>{p.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Integration Guide Section */}
        <section id="integration-guide" className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">🛠️ Integration Guide</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The simplest way to integrate SnappGames is using our standard iframe method.
            Just replace `YOUR_PROPERTY_ID` with your actual ID.
          </p>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative p-6 rounded-xl bg-gray-900 dark:bg-black border border-gray-800 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">HTML snippet</span>
                <button className="text-[10px] text-blue-400 hover:text-blue-300 font-bold uppercase">Copy Code</button>
              </div>
              <pre className="text-xs text-blue-100 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {`<iframe
  src="https://www.snappgames.com/embed/?id=YOUR_PROPERTY_ID"
  width="100%"
  height="600"
  frameborder="0"
  allowfullscreen
></iframe>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Revenue Sharing Section */}
        <section id="rev-share" className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">💰 Revenue Sharing</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            SnappGames operates on a transparent ad-revenue sharing model.
            All ads served within the game environment contribute to your monthly earnings.
            You can track your performance in real-time through the <span className="font-bold text-orange-500">Payments</span> section of this dashboard.
          </p>
          <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800">
            <p className="text-xs text-orange-700 dark:text-orange-300 font-medium">
              Note: Revenue is typically calculated on a Net-30 basis and paid out in your preferred currency (USD/INR).
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">❓ FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "Can I customize the game list?", a: "Yes, you can filter genres and specific titles from your dashboard control panel." },
              { q: "Is it mobile friendly?", a: "SnappGames are built with HTML5 and are fully responsive across all mobile browsers." },
              { q: "How do I get paid?", a: "You can set up your bank details in the Account Info section. We support wire transfers and popular digital wallets." }
            ].map((f, i) => (
              <div key={i} className="space-y-2 border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white italic">Q: {f.q}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-20 border-t border-gray-100 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400 mb-6 italic">Last updated: {new Date().toLocaleDateString("en-US", { month: 'long', year: 'numeric', day: 'numeric' })}</p>
          <div className="flex items-center justify-center gap-6">
            {["GitHub", "LinkedIn", "X (Twitter)", "Support"].map((link) => (
              <button key={link} className="text-[10px] font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white uppercase tracking-widest">{link}</button>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
