import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchArtworks } from '@/api/searchArtworks';
import { useAppStore } from '@/store/useAppStore';
import SearchResultCard from '@/components/SearchResultCard';
import SkeletonCard from '@/components/SkeletonCard';
import EmptyState from '@/components/EmptyState';
import { useDebounce } from '@/hooks/useDebounce';
import type { Artwork } from '@/types/artwork';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { artworks, addArtwork } = useAppStore();

  const debouncedSet = useDebounce(
    useCallback((val: string) => setDebouncedQuery(val), []),
    400
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedSet(e.target.value);
  };

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['search-artworks', debouncedQuery],
    queryFn: () => searchArtworks(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 5 * 60 * 1000,
  });

  const savedIds = new Set(artworks.map((a) => a.id));

  const handleAdd = (artwork: Artwork) => {
    addArtwork(artwork);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold glow-text">Rechercher</h1>
        <p className="text-muted-foreground mt-1">
          Explorez des milliers d'œuvres du Metropolitan Museum et de l'Art Institute of Chicago
        </p>
      </div>

      <div className="relative max-w-xl mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={handleChange}
          placeholder="Rechercher un artiste, une œuvre…"
          className="pl-10 bg-secondary/50 border-glass-border h-11"
        />
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!isLoading && debouncedQuery.length >= 2 && results.length === 0 && (
        <EmptyState
          icon={<Search className="h-16 w-16" />}
          title="Aucun résultat"
          description={`Aucune œuvre trouvée pour « ${debouncedQuery} ». Essayez un autre terme.`}
        />
      )}

      {!isLoading && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {results.map((artwork, i) => (
            <SearchResultCard
              key={artwork.id}
              artwork={artwork}
              onAdd={handleAdd}
              alreadySaved={savedIds.has(artwork.id)}
              index={i}
            />
          ))}
        </div>
      )}

      {!isLoading && debouncedQuery.length < 2 && (
        <EmptyState
          icon={<Search className="h-16 w-16" />}
          title="Commencez votre recherche"
          description="Tapez au moins 2 caractères pour explorer les collections d'art."
        />
      )}
    </div>
  );
}
