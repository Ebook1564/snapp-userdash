"use client";

import React, { useState } from "react";
import { ArrowRightIcon, DocsIcon, FileIcon, BoltIcon, InfoIcon } from "@/icons";

type DocArticle = {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  readTime: string;
  tags: string[];
  content: React.ReactNode;
};

const documentationArticles: DocArticle[] = [
  {
    id: "getting-started-guide",
    title: "Getting Started with SnappGame Business",
    category: "Getting Started",
    icon: <BoltIcon className="h-5 w-5" />,
    description: "Learn the basics of SnappGame Business platform and how to set up your account.",
    readTime: "5 min read",
    tags: ["basics", "setup", "onboarding"],
    content: (
      <div className="space-y-6">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h2>Welcome to SnappGame Business</h2>
          <p>
            SnappGame Business is a comprehensive platform designed to help game developers and publishers
            manage their games, campaigns, and analytics all in one place. This guide will walk you through
            the essential steps to get started.
          </p>
          
          <h3>Creating Your Account</h3>
          <p>
            To begin, you'll need to create an account. Simply navigate to the sign-up page and provide
            your business information. Once your account is verified, you'll gain access to the full
            suite of features.
          </p>
          
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-500/30 dark:bg-blue-500/10">
            <h4 className="mb-2 text-sm font-semibold text-blue-900 dark:text-blue-400">
              💡 Pro Tip
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Make sure to verify your email address to unlock all features and receive important
              notifications about your account.
            </p>
          </div>
          
          <h3>Setting Up Your First Game</h3>
          <p>
            After logging in, you can add your first game to the platform. Navigate to the Creatives
            Library section and click "Add New Game". Fill in the required information including:
          </p>
          <ul>
            <li>Game name and description</li>
            <li>Platform (iOS, Android, Web)</li>
            <li>Category and genre</li>
            <li>App Store/Play Store links</li>
          </ul>
          
          <h3>Next Steps</h3>
          <p>
            Once your game is added, you can start creating campaigns, tracking analytics, and managing
            your creative assets. Check out our other guides for more detailed information on each feature.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "campaign-management",
    title: "Campaign Management Best Practices",
    category: "Campaigns",
    icon: <DocsIcon className="h-5 w-5" />,
    description: "Learn how to create and manage effective advertising campaigns for your games.",
    readTime: "8 min read",
    tags: ["campaigns", "advertising", "best-practices"],
    content: (
      <div className="space-y-6">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h2>Campaign Management Best Practices</h2>
          <p>
            Effective campaign management is crucial for maximizing your return on investment. This guide
            covers the essential strategies and best practices for creating and managing successful campaigns.
          </p>
          
          <h3>Planning Your Campaign</h3>
          <p>
            Before creating a campaign, it's important to define your objectives. Are you looking to:
          </p>
          <ul>
            <li>Increase user acquisition?</li>
            <li>Boost in-app purchases?</li>
            <li>Improve user retention?</li>
            <li>Promote a new game launch?</li>
          </ul>
          
          <h3>Setting Campaign Budgets</h3>
          <p>
            Budget allocation is a critical aspect of campaign management. Consider the following:
          </p>
          <ul>
            <li>Start with a test budget to gauge performance</li>
            <li>Allocate more budget to high-performing campaigns</li>
            <li>Set daily and total budget limits</li>
            <li>Monitor spending regularly</li>
          </ul>
          
          <h3>Targeting Your Audience</h3>
          <p>
            Proper audience targeting can significantly improve campaign performance. Use demographic
            data, interests, and behavior patterns to reach the right users at the right time.
          </p>
          
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-500/30 dark:bg-green-500/10">
            <h4 className="mb-2 text-sm font-semibold text-green-900 dark:text-green-400">
              ✅ Best Practice
            </h4>
            <p className="text-sm text-green-700 dark:text-green-400">
              A/B test different ad creatives and targeting options to find what works best for your
              audience. Small changes can lead to significant improvements in performance.
            </p>
          </div>
          
          <h3>Monitoring and Optimization</h3>
          <p>
            Regularly review your campaign performance metrics. Key metrics to watch include:
          </p>
          <ul>
            <li>Click-through rate (CTR)</li>
            <li>Conversion rate</li>
            <li>Cost per acquisition (CPA)</li>
            <li>Return on ad spend (ROAS)</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "analytics-dashboard",
    title: "Understanding Your Analytics Dashboard",
    category: "Analytics",
    icon: <FileIcon className="h-5 w-5" />,
    description: "A comprehensive guide to interpreting and using your analytics data effectively.",
    readTime: "10 min read",
    tags: ["analytics", "metrics", "reporting"],
    content: (
      <div className="space-y-6">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h2>Understanding Your Analytics Dashboard</h2>
          <p>
            The Analytics Dashboard provides comprehensive insights into your game performance, user
            behavior, and revenue metrics. This guide will help you understand and utilize these
            insights effectively.
          </p>
          
          <h3>Key Metrics Overview</h3>
          <p>
            Your dashboard displays several key performance indicators (KPIs):
          </p>
          
          <h4>User Metrics</h4>
          <ul>
            <li><strong>Daily Active Users (DAU):</strong> Number of unique users who engage with your game daily</li>
            <li><strong>Monthly Active Users (MAU):</strong> Total unique users in a month</li>
            <li><strong>User Retention:</strong> Percentage of users who return after their first session</li>
            <li><strong>Session Length:</strong> Average time users spend in your game per session</li>
          </ul>
          
          <h4>Revenue Metrics</h4>
          <ul>
            <li><strong>Revenue:</strong> Total income from in-app purchases and ads</li>
            <li><strong>ARPU:</strong> Average Revenue Per User</li>
            <li><strong>ARPPU:</strong> Average Revenue Per Paying User</li>
            <li><strong>Conversion Rate:</strong> Percentage of users who make a purchase</li>
          </ul>
          
          <h3>Using Filters and Date Ranges</h3>
          <p>
            You can filter your analytics data by:
          </p>
          <ul>
            <li>Date range (daily, weekly, monthly, custom)</li>
            <li>Specific games or campaigns</li>
            <li>Platform (iOS, Android, Web)</li>
            <li>Geographic region</li>
          </ul>
          
          <h3>Exporting Reports</h3>
          <p>
            All analytics data can be exported in various formats including CSV, PDF, and Excel.
            This allows you to perform deeper analysis or share insights with your team.
          </p>
          
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-500/30 dark:bg-purple-500/10">
            <h4 className="mb-2 text-sm font-semibold text-purple-900 dark:text-purple-400">
              📊 Data Tip
            </h4>
            <p className="text-sm text-purple-700 dark:text-purple-400">
              Compare metrics across different time periods to identify trends and patterns. This
              can help you make data-driven decisions about your games and campaigns.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "creative-assets",
    title: "Managing Creative Assets",
    category: "Creatives",
    icon: <BoltIcon className="h-5 w-5" />,
    description: "Learn how to organize and manage your game assets, screenshots, and promotional materials.",
    readTime: "6 min read",
    tags: ["creatives", "assets", "media"],
    content: (
      <div className="space-y-6">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h2>Managing Creative Assets</h2>
          <p>
            The Creatives Library is your central hub for managing all game-related assets. This includes
            screenshots, videos, icons, banners, and other promotional materials.
          </p>
          
          <h3>Uploading Assets</h3>
          <p>
            To upload new assets:
          </p>
          <ol>
            <li>Navigate to the Creatives Library</li>
            <li>Click "Upload New Asset"</li>
            <li>Select the files you want to upload</li>
            <li>Add metadata (tags, descriptions, etc.)</li>
            <li>Assign to specific games or campaigns</li>
          </ol>
          
          <h3>Supported File Formats</h3>
          <p>
            We support the following file formats:
          </p>
          <ul>
            <li><strong>Images:</strong> JPG, PNG, GIF, WebP (max 10MB)</li>
            <li><strong>Videos:</strong> MP4, MOV, WebM (max 100MB)</li>
            <li><strong>Documents:</strong> PDF, DOC, DOCX (max 5MB)</li>
          </ul>
          
          <h3>Organizing Your Library</h3>
          <p>
            Keep your assets organized by:
          </p>
          <ul>
            <li>Using descriptive file names</li>
            <li>Adding relevant tags</li>
            <li>Grouping assets by game or campaign</li>
            <li>Creating folders for different asset types</li>
          </ul>
          
          <h3>Asset Versioning</h3>
          <p>
            When updating existing assets, the platform automatically maintains version history.
            You can view previous versions and revert if needed.
          </p>
          
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-500/30 dark:bg-orange-500/10">
            <h4 className="mb-2 text-sm font-semibold text-orange-900 dark:text-orange-400">
              ⚠️ Important
            </h4>
            <p className="text-sm text-orange-700 dark:text-orange-400">
              Always use high-quality assets for best results. Low-resolution images or videos may
              negatively impact campaign performance.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "faq-common-questions",
    title: "Frequently Asked Questions",
    category: "FAQ",
    icon: <InfoIcon className="h-5 w-5" />,
    description: "Find answers to the most commonly asked questions about SnappGame Business.",
    readTime: "7 min read",
    tags: ["faq", "help", "support"],
    content: (
      <div className="space-y-6">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h2>Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white/90">
                How do I reset my password?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click on "Forgot Password" on the login page, enter your email address, and follow
                the instructions sent to your email. The reset link will expire after 24 hours for
                security reasons.
              </p>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white/90">
                Can I have multiple games on one account?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Yes! You can add unlimited games to your account. Each game can have its own campaigns,
                analytics, and creative assets. Use the Creatives Library to manage all your games
                from one central location.
              </p>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white/90">
                How often is analytics data updated?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Analytics data is updated in real-time for most metrics. However, some aggregated
                reports may have a delay of up to 15 minutes. Revenue and financial data is typically
                updated within 1 hour of transactions.
              </p>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white/90">
                What payment methods are accepted?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and
                bank transfers for enterprise accounts. Payment processing is secure and handled by
                our trusted payment partners.
              </p>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white/90">
                How do I contact support?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You can reach our support team through the Support Center in your dashboard, via email
                at support@snappgame.com, or through the live chat feature (available during business
                hours). We typically respond within 24 hours.
              </p>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white/90">
                Can I export my data?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Yes, you can export your analytics data, campaign reports, and asset lists in various
                formats including CSV, PDF, and Excel. Navigate to the relevant section and look for
                the "Export" button.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const categories = [
  "All",
  "Getting Started",
  "Campaigns",
  "Analytics",
  "Creatives",
  "FAQ",
];

export default function DocumentationPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<string | null>(
    documentationArticles[0].id
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles =
    selectedCategory === "All"
      ? documentationArticles
      : documentationArticles.filter((article) => article.category === selectedCategory);

  const searchFilteredArticles = searchQuery
    ? filteredArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredArticles;

  const currentArticle = documentationArticles.find((a) => a.id === selectedArticle);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
            Documentation
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Comprehensive guides, tutorials, and resources to help you succeed with SnappGame Business.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 pl-9 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:placeholder:text-gray-500 dark:focus:border-brand-500"
              />
              <svg
                className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-brand-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:bg-white/5"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Articles List */}
            <nav className="space-y-2 rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-white/[0.03]">
              {searchFilteredArticles.length > 0 ? (
                searchFilteredArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => setSelectedArticle(article.id)}
                    className={`w-full rounded-lg border p-3 text-left transition-all ${
                      selectedArticle === article.id
                        ? "border-brand-500 bg-brand-50 dark:border-brand-500 dark:bg-brand-500/20"
                        : "border-transparent bg-gray-50 hover:border-gray-200 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 rounded-lg p-2 ${
                          selectedArticle === article.id
                            ? "bg-brand-500 text-white"
                            : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                        }`}
                      >
                        {article.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-sm font-semibold ${
                            selectedArticle === article.id
                              ? "text-brand-700 dark:text-brand-400"
                              : "text-gray-900 dark:text-white/90"
                          }`}
                        >
                          {article.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                          {article.description}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                          <span>{article.readTime}</span>
                          <span>•</span>
                          <span>{article.category}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No articles found. Try a different search or category.
                  </p>
                </div>
              )}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-8">
          {currentArticle ? (
            <div className="rounded-xl border border-gray-200 bg-white px-6 py-8 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-brand-500 p-2 text-white">
                  {currentArticle.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-brand-600 dark:text-brand-400">
                      {currentArticle.category}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {currentArticle.readTime}
                    </span>
                  </div>
                  <h2 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white/90">
                    {currentArticle.title}
                  </h2>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {currentArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-sm max-w-none dark:prose-invert">
                {currentArticle.content}
              </div>

              {/* Related Articles */}
              <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
                <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white/90">
                  Related Articles
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {documentationArticles
                    .filter(
                      (article) =>
                        article.id !== currentArticle.id &&
                        (article.category === currentArticle.category ||
                          article.tags.some((tag) => currentArticle.tags.includes(tag)))
                    )
                    .slice(0, 2)
                    .map((article) => (
                      <button
                        key={article.id}
                        onClick={() => setSelectedArticle(article.id)}
                        className="group rounded-lg border border-gray-200 bg-white p-4 text-left transition-all hover:border-brand-500 hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-brand-500"
                      >
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white/90">
                          <span>{article.title}</span>
                          <ArrowRightIcon className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {article.readTime}
                        </p>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select an article from the sidebar to view documentation.
              </p>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-500/30 dark:bg-brand-500/10">
              <h3 className="mb-2 text-sm font-semibold text-brand-900 dark:text-brand-400">
                Still Need Help?
              </h3>
              <p className="mb-3 text-xs text-brand-700 dark:text-brand-400">
                Can't find what you're looking for? Our support team is ready to assist you.
              </p>
              <a
                href="/support"
                className="inline-block rounded-lg border border-brand-300 bg-white px-3 py-1.5 text-xs font-medium text-brand-700 hover:bg-brand-100 dark:border-brand-500 dark:bg-gray-900 dark:text-brand-400 dark:hover:bg-gray-800"
              >
                Contact Support
              </a>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
              <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white/90">
                Developer Documentation
              </h3>
              <p className="mb-3 text-xs text-gray-600 dark:text-gray-400">
                Looking for API documentation and SDK integration guides?
              </p>
              <a
                href="/developer-doc"
                className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                View Developer Docs
                <ArrowRightIcon className="h-3 w-3" />
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

