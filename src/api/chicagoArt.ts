import type { Artwork } from '@/types/artwork';

const BASE = 'https://api.artic.edu/api/v1';

interface ChicagoResult {
  id: number;
  title: string;
  artist_title: string;
  date_display: string;
  place_of_origin: string;
  artist_display: string;
  image_id: string;
}

export async function searchChicago(query: string): Promise<Artwork[]> {
  const res = await fetch(
    `${BASE}/artworks/search?q=${encodeURIComponent(query)}&limit=8&fields=id,title,artist_title,date_display,place_of_origin,artist_display,image_id`
  );
  const data = await res.json();
  if (!data.data?.length) return [];

  return data.data
    .filter((d: ChicagoResult) => !!d.image_id)
    .map((d: ChicagoResult) => {
      const birthDeath = extractBirthDeath(d.artist_display);
      return {
        id: `chicago-${d.id}`,
        title: d.title || 'Sans titre',
        artist: d.artist_title || 'Artiste inconnu',
        year: d.date_display || '',
        artistNationality: d.place_of_origin || '',
        artistBirthDeath: birthDeath,
        image: `https://www.artic.edu/iiif/2/${d.image_id}/full/843,/0/default.jpg`,
        source: 'chicago' as const,
        externalUrl: `https://www.artic.edu/artworks/${d.id}`,
      };
    });
}

function extractBirthDeath(display: string): string {
  const match = display?.match(/(\d{4})\s*[-–]\s*(\d{4})/);
  return match ? `${match[1]}-${match[2]}` : '';
}
