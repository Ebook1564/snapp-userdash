"use client";

import React, { useState } from "react";
import { CopyIcon, ArrowRightIcon } from "@/icons";

type DocSection = {
  id: string;
  title: string;
  icon: string;
  subsections: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
};

const documentation: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "🚀",
    subsections: [
      {
        id: "introduction",
        title: "Introduction",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Welcome to the SnappGame Developer Documentation. This guide will help you integrate
              our platform into your games and start monetizing your content effectively.
            </p>
            <div className="rounded-lg border border-brand-200 bg-brand-50 p-4 dark:border-brand-500/30 dark:bg-brand-500/10">
              <h4 className="mb-2 text-sm font-semibold text-brand-900 dark:text-brand-400">
                Quick Start
              </h4>
              <p className="text-xs text-brand-700 dark:text-brand-400">
                Get up and running in 5 minutes. Follow our step-by-step guide to integrate the SDK
                into your game.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "installation",
        title: "Installation",
        content: (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white/90">
              SDK Installation
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Install the SnappGame SDK using your preferred package manager:
            </p>
            <div className="relative">
              <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs dark:border-gray-800 dark:bg-gray-900">
                <code className="text-gray-800 dark:text-gray-300">
                  {`npm install @snappgame/sdk
# or
yarn add @snappgame/sdk
# or
pnpm add @snappgame/sdk`}
                </code>
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("npm install @snappgame/sdk");
                }}
                className="absolute right-2 top-2 rounded p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                title="Copy code"
              >
                <CopyIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ),
      },
      {
        id: "authentication",
        title: "Authentication",
        content: (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white/90">
              API Authentication
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All API requests require authentication using your API key. Include it in the
              Authorization header:
            </p>
            <div className="relative">
              <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs dark:border-gray-800 dark:bg-gray-900">
                <code className="text-gray-800 dark:text-gray-300">
                  {`Authorization: Bearer YOUR_API_KEY`}
                </code>
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("Authorization: Bearer YOUR_API_KEY");
                }}
                className="absolute right-2 top-2 rounded p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                title="Copy code"
              >
                <CopyIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="rounded-lg border border-warning-200 bg-warning-50 p-3 dark:border-warning-500/30 dark:bg-warning-500/10">
              <p className="text-xs text-warning-800 dark:text-warning-400">
                ⚠️ Keep your API keys secure. Never commit them to version control or expose them
                in client-side code.
              </p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: "api-reference",
    title: "API Reference",
    icon: "📚",
    subsections: [
      {
        id: "games",
        title: "Games API",
        content: (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white/90">
              Get All Games
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Retrieve a list of all games in your account.
            </p>
            <div className="space-y-2">
              <div className="relative">
                <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs dark:border-gray-800 dark:bg-gray-900">
                  <code className="text-gray-800 dark:text-gray-300">
                    {`GET /api/v1/games

Response:
{
  "data": [
    {
      "id": "game_123",
      "name": "My Awesome Game",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 1
  }
}`}
                  </code>
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("GET /api/v1/games");
                  }}
                  className="absolute right-2 top-2 rounded p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                  title="Copy code"
                >
                  <CopyIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "campaigns",
        title: "Campaigns API",
        content: (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white/90">
              Create Campaign
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create a new advertising campaign for your game.
            </p>
            <div className="relative">
              <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs dark:border-gray-800 dark:bg-gray-900">
                <code className="text-gray-800 dark:text-gray-300">
                  {`POST /api/v1/campaigns

Request Body:
{
  "name": "Summer Sale Campaign",
  "game_id": "game_123",
  "budget": 5000,
  "start_date": "2024-06-01",
  "end_date": "2024-06-30"
}

Response:
{
  "id": "campaign_456",
  "name": "Summer Sale Campaign",
  "status": "active",
  "created_at": "2024-05-15T10:30:00Z"
}`}
                </code>
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("POST /api/v1/campaigns");
                }}
                className="absolute right-2 top-2 rounded p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                title="Copy code"
              >
                <CopyIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ),
      },
      {
        id: "analytics",
        title: "Analytics API",
        content: (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white/90">
              Get Analytics Data
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Retrieve analytics data for your games and campaigns.
            </p>
            <div className="relative">
              <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs dark:border-gray-800 dark:bg-gray-900">
                <code className="text-gray-800 dark:text-gray-300">
                  {`GET /api/v1/analytics?game_id=game_123&start_date=2024-01-01&end_date=2024-01-31

Response:
{
  "data": {
    "impressions": 125000,
    "clicks": 3500,
    "conversions": 450,
    "revenue": 12500.50,
    "ctr": 2.8,
    "conversion_rate": 12.86
  }
}`}
                </code>
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("GET /api/v1/analytics");
                }}
                className="absolute right-2 top-2 rounded p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                title="Copy code"
              >
                <CopyIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: "sdk-integration",
    title: "SDK Integration",
    icon: "⚙️",
    subsections: [
      {
        id: "initialization",
        title: "SDK Initialization",
        content: (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white/90">
              Initialize the SDK
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Initialize the SnappGame SDK in your application:
            </p>
            <div className="relative">
              <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs dark:border-gray-800 dark:bg-gray-900">
                <code className="text-gray-800 dark:text-gray-300">
                  {`import { SnappGameSDK } from '@snappgame/sdk';

const sdk = new SnappGameSDK({
  apiKey: 'YOUR_API_KEY',
  environment: 'production', // or 'sandbox'
  gameId: 'game_123'
});

await sdk.initialize();`}
                </code>
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    "import { SnappGameSDK } from '@snappgame/sdk';"
                  );
                }}
                className="absolute right-2 top-2 rounded p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                title="Copy code"
              >
                <CopyIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ),
      },
      {
        id: "events",
        title: "Tracking Events",
        content: (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white/90">
              Track User Events
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track important user events to optimize your campaigns:
            </p>
            <div className="relative">
              <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs dark:border-gray-800 dark:bg-gray-900">
                <code className="text-gray-800 dark:text-gray-300">
                  {`// Track a purchase event
sdk.trackEvent('purchase', {
  amount: 9.99,
  currency: 'USD',
  item_id: 'premium_pack',
  user_id: 'user_123'
});

// Track level completion
sdk.trackEvent('level_complete', {
  level: 5,
  score: 15000,
  time_spent: 120
});`}
                </code>
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("sdk.trackEvent('purchase', {...});");
                }}
                className="absolute right-2 top-2 rounded p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                title="Copy code"
              >
                <CopyIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ),
      },
      {
        id: "ad-placement",
        title: "Ad Placement",
        content: (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white/90">
              Display Ads
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Integrate ads into your game at strategic points:
            </p>
            <div className="relative">
              <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs dark:border-gray-800 dark:bg-gray-900">
                <code className="text-gray-800 dark:text-gray-300">
                  {`// Show interstitial ad after level completion
sdk.showAd('interstitial', {
  placement: 'level_complete',
  onClose: () => {
    // Continue to next level
  },
  onError: (error) => {
    console.error('Ad error:', error);
  }
});

// Show rewarded ad
sdk.showAd('rewarded', {
  placement: 'extra_lives',
  onReward: (reward) => {
    // Give player extra lives
    giveExtraLives(reward.amount);
  }
});`}
                </code>
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("sdk.showAd('interstitial', {...});");
                }}
                className="absolute right-2 top-2 rounded p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                title="Copy code"
              >
                <CopyIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: "examples",
    title: "Code Examples",
    icon: "💻",
    subsections: [
      {
        id: "react-example",
        title: "React Integration",
        content: (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white/90">
              React Component Example
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Example of integrating SnappGame SDK in a React application:
            </p>
            <div className="relative">
              <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs dark:border-gray-800 dark:bg-gray-900">
                <code className="text-gray-800 dark:text-gray-300">
                  {`import { useEffect } from 'react';
import { SnappGameSDK } from '@snappgame/sdk';

function GameComponent() {
  useEffect(() => {
    const sdk = new SnappGameSDK({
      apiKey: process.env.REACT_APP_SNAPPGAME_API_KEY,
      gameId: 'game_123'
    });
    
    sdk.initialize();
    
    return () => sdk.destroy();
  }, []);
  
  const handleLevelComplete = () => {
    sdk.trackEvent('level_complete', { level: currentLevel });
    sdk.showAd('interstitial');
  };
  
  return <div>Your game content</div>;
}`}
                </code>
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("import { SnappGameSDK } from '@snappgame/sdk';");
                }}
                className="absolute right-2 top-2 rounded p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                title="Copy code"
              >
                <CopyIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ),
      },
      {
        id: "unity-example",
        title: "Unity Integration",
        content: (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white/90">
              Unity C# Example
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Example of integrating SnappGame SDK in a Unity game:
            </p>
            <div className="relative">
              <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs dark:border-gray-800 dark:bg-gray-900">
                <code className="text-gray-800 dark:text-gray-300">
                  {`using SnappGameSDK;

public class GameManager : MonoBehaviour
{
    private SnappGameSDK sdk;
    
    void Start()
    {
        sdk = new SnappGameSDK("YOUR_API_KEY", "game_123");
        sdk.Initialize();
    }
    
    public void OnLevelComplete(int level)
    {
        sdk.TrackEvent("level_complete", new Dictionary<string, object>
        {
            { "level", level },
            { "score", currentScore }
        });
        
        sdk.ShowAd("interstitial");
    }
}`}
                </code>
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("using SnappGameSDK;");
                }}
                className="absolute right-2 top-2 rounded p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                title="Copy code"
              >
                <CopyIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: "best-practices",
    title: "Best Practices",
    icon: "✨",
    subsections: [
      {
        id: "performance",
        title: "Performance Optimization",
        content: (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white/90">
              Optimize SDK Performance
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Initialize the SDK early in your app lifecycle, but not during critical game
                  loading
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Use lazy loading for ad placements to avoid blocking game startup</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Batch event tracking when possible to reduce network requests
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Cache API responses locally to minimize redundant API calls
                </span>
              </li>
            </ul>
          </div>
        ),
      },
      {
        id: "user-experience",
        title: "User Experience",
        content: (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white/90">
              UX Guidelines
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Show ads at natural break points (level completion, menu screens) rather than
                  interrupting gameplay
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Always provide a skip option for non-rewarded ads after a reasonable duration
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Make rewarded ads clearly valuable to the user (extra lives, coins, etc.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Test ad placement on different devices and screen sizes
                </span>
              </li>
            </ul>
          </div>
        ),
      },
      {
        id: "security",
        title: "Security",
        content: (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white/90">
              Security Best Practices
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Never expose your API keys in client-side code. Use environment variables or
                  secure configuration
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Validate all user input before sending to the API
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Use HTTPS for all API communications
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Implement rate limiting on your side to prevent abuse
                </span>
              </li>
            </ul>
            <div className="rounded-lg border border-error-200 bg-error-50 p-3 dark:border-error-500/30 dark:bg-error-500/10">
              <p className="text-xs text-error-800 dark:text-error-400">
                ⚠️ Always keep your API keys secure. Rotate them regularly and revoke any keys that
                may have been compromised.
              </p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: "🔧",
    subsections: [
      {
        id: "common-issues",
        title: "Common Issues",
        content: (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white/90">
              Frequently Asked Questions
            </h4>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
                <h5 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white/90">
                  Q: Ads are not showing
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  A: Check that your API key is valid and your account has active campaigns. Ensure
                  the SDK is properly initialized before calling showAd().
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
                <h5 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white/90">
                  Q: Events are not being tracked
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  A: Verify your network connection and check the browser console for errors. Make
                  sure you're using the correct event names and parameters.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
                <h5 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white/90">
                  Q: API returns 401 Unauthorized
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  A: Your API key may be invalid or expired. Check your API key in the dashboard
                  and ensure it's correctly included in the Authorization header.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "error-codes",
        title: "Error Codes",
        content: (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white/90">
              API Error Codes
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-white/90">
                      Code
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-white/90">
                      Message
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-white/90">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="px-4 py-2 font-mono text-xs">400</td>
                    <td className="px-4 py-2">Bad Request</td>
                    <td className="px-4 py-2">Invalid request parameters</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="px-4 py-2 font-mono text-xs">401</td>
                    <td className="px-4 py-2">Unauthorized</td>
                    <td className="px-4 py-2">Invalid or missing API key</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="px-4 py-2 font-mono text-xs">403</td>
                    <td className="px-4 py-2">Forbidden</td>
                    <td className="px-4 py-2">Insufficient permissions</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="px-4 py-2 font-mono text-xs">404</td>
                    <td className="px-4 py-2">Not Found</td>
                    <td className="px-4 py-2">Resource not found</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="px-4 py-2 font-mono text-xs">429</td>
                    <td className="px-4 py-2">Too Many Requests</td>
                    <td className="px-4 py-2">Rate limit exceeded</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">500</td>
                    <td className="px-4 py-2">Internal Server Error</td>
                    <td className="px-4 py-2">Server error, contact support</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
    ],
  },
];

export default function DeveloperDocPage() {
  const [selectedSection, setSelectedSection] = useState<string>("getting-started");
  const [selectedSubsection, setSelectedSubsection] = useState<string>("introduction");
  const [searchQuery, setSearchQuery] = useState("");

  const currentSection = documentation.find((s) => s.id === selectedSection);
  const currentSubsection = currentSection?.subsections.find(
    (s) => s.id === selectedSubsection
  );

  // Filter documentation based on search
  const filteredDocs = searchQuery
    ? documentation
        .map((section) => ({
          ...section,
          subsections: section.subsections.filter(
            (sub) =>
              sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              section.title.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((section) => section.subsections.length > 0)
    : documentation;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
            Developer Documentation
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Complete guide to integrating SnappGame SDK and APIs into your games.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3">
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

            {/* Navigation */}
            <nav className="space-y-1 rounded-xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03]">
              {filteredDocs.map((section) => (
                <div key={section.id} className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedSection(section.id);
                      setSelectedSubsection(section.subsections[0].id);
                    }}
                    className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      selectedSection === section.id
                        ? "bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400"
                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
                    }`}
                  >
                    <span>{section.icon}</span>
                    <span className="flex-1">{section.title}</span>
                    <ArrowRightIcon
                      className={`h-4 w-4 transition-transform ${
                        selectedSection === section.id ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {selectedSection === section.id && (
                    <div className="ml-4 space-y-0.5 border-l-2 border-gray-200 pl-3 dark:border-gray-800">
                      {section.subsections.map((subsection) => (
                        <button
                          key={subsection.id}
                          onClick={() => setSelectedSubsection(subsection.id)}
                          className={`block w-full rounded px-2 py-1.5 text-left text-xs transition-colors ${
                            selectedSubsection === subsection.id
                              ? "bg-brand-50 font-medium text-brand-700 dark:bg-brand-500/20 dark:text-brand-400"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                          }`}
                        >
                          {subsection.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9">
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            {currentSubsection ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white/90">
                    {currentSubsection.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {currentSection?.title}
                  </p>
                </div>

                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {currentSubsection.content}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Select a section from the sidebar to view documentation.
                </p>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-500/30 dark:bg-brand-500/10">
              <h3 className="mb-2 text-sm font-semibold text-brand-900 dark:text-brand-400">
                Need Help?
              </h3>
              <p className="mb-3 text-xs text-brand-700 dark:text-brand-400">
                Can't find what you're looking for? Our support team is here to help.
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
                API Status
              </h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success-500"></span>
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-400">All systems operational</p>
              </div>
              <a
                href="#"
                className="mt-2 inline-block text-xs text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                View API Status Page →
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

