import CreativesClient from "./CreativesClient";

export function generateStaticParams() {
  // Generate params for 1 to 15 which are the supported game IDs
  return Array.from({ length: 15 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <CreativesClient id={resolvedParams.id} />;
}
