import type { Artwork } from '@/types/artwork';

const BASE = 'https://collectionapi.metmuseum.org/public/collection/v1';

interface MetObject {
  objectID: number;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  artistNationality: string;
  artistBeginDate: string;
  artistEndDate: string;
  primaryImageSmall: string;
  primaryImage: string;
  objectURL: string;
}

export async function searchMet(query: string): Promise<Artwork[]> {
  const res = await fetch(`${BASE}/search?hasImages=true&q=${encodeURIComponent(query)}`);
  const data = await res.json();
  if (!data.objectIDs?.length) return [];

  const ids = data.objectIDs.slice(0, 8);
  const objects = await Promise.all(
    ids.map((id: number) =>
      fetch(`${BASE}/objects/${id}`).then((r) => r.json()).catch(() => null)
    )
  );

  return objects
    .filter((o: MetObject | null): o is MetObject => !!o && !!(o.primaryImageSmall || o.primaryImage))
    .map((o) => ({
      id: `met-${o.objectID}`,
      title: o.title || 'Sans titre',
      artist: o.artistDisplayName || 'Artiste inconnu',
      year: o.objectDate || '',
      artistNationality: o.artistNationality || '',
      artistBirthDeath: o.artistBeginDate && o.artistEndDate ? `${o.artistBeginDate}-${o.artistEndDate}` : '',
      image: o.primaryImageSmall || o.primaryImage,
      source: 'met' as const,
      externalUrl: o.objectURL || '',
    }));
}
