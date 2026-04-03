export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  artistNationality: string;
  artistBirthDeath: string;
  image: string;
  source: 'met' | 'chicago' | 'harvard' | 'manual';
  externalUrl: string;
  userDescription?: string;
}

export interface Museum {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  websiteUrl: string;
}
