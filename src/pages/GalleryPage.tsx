import { useAppStore } from '@/store/useAppStore';
import ArtworkCard from '@/components/ArtworkCard';
import EmptyState from '@/components/EmptyState';
import { Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function GalleryPage() {
  const { artworks, removeArtwork } = useAppStore();

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold glow-text">Ma Galerie</h1>
        <p className="text-muted-foreground mt-1">
          {artworks.length} œuvre{artworks.length !== 1 ? 's' : ''} sauvegardée{artworks.length !== 1 ? 's' : ''}
        </p>
      </div>

      {artworks.length === 0 ? (
        <EmptyState
          icon={<Image className="h-16 w-16" />}
          title="Votre galerie est vide"
          description="Recherchez des œuvres d'art et ajoutez-les à votre collection personnelle."
          action={
            <Link to="/recherche">
              <Button>Rechercher des œuvres</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {artworks.map((artwork, i) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onRemove={removeArtwork}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}
