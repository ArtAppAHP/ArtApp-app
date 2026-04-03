import type { Artwork } from '@/types/artwork';
import { searchMet } from './metMuseum';
import { searchChicago } from './chicagoArt';

export async function searchArtworks(query: string): Promise<Artwork[]> {
  if (!query.trim()) return [];

  const [metResults, chicagoResults] = await Promise.allSettled([
    searchMet(query),
    searchChicago(query),
  ]);

  const results: Artwork[] = [
    ...(metResults.status === 'fulfilled' ? metResults.value : []),
    ...(chicagoResults.status === 'fulfilled' ? chicagoResults.value : []),
  ];

  // Deduplicate by title+artist
  const seen = new Set<string>();
  return results.filter((a) => {
    const key = `${a.title.toLowerCase()}-${a.artist.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
