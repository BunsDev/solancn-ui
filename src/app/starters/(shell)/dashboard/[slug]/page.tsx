export default async function StarterSlugPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md p-96">
      <div className="text-muted-foreground">{slug}</div>
    </div>
  );
}
