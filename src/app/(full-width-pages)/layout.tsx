export default function FullWidthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full overflow-x-hidden">{children}</div>;
}
