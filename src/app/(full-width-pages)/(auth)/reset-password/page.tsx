import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | TailAdmin - Next.js Dashboard Template",
  description: "Reset your password for TailAdmin Dashboard",
};

export default function ResetPassword() {
  return <ResetPasswordForm />;
}

