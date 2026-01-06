import AccountOverview from "@/components/overview/AccountOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Overview | TailAdmin - Next.js Dashboard Template",
  description: "View your account properties and financial overview",
};

export default function OverviewPage() {
  return <AccountOverview />;
}

