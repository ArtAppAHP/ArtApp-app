export default function SkeletonCard() {
  return (
    <div className="glass rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-muted/30" style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', backgroundImage: 'linear-gradient(90deg, transparent, hsl(var(--muted) / 0.3), transparent)' }} />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-muted/30 rounded w-3/4" />
        <div className="h-3 bg-muted/20 rounded w-1/2" />
      </div>
    </div>
  );
}
