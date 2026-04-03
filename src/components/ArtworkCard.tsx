import type { Artwork } from '@/types/artwork';
import { Trash2, FileText, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Props {
  artwork: Artwork;
  onRemove?: (id: string) => void;
  index?: number;
}

export default function ArtworkCard({ artwork, onRemove, index = 0 }: Props) {
  const [showDesc, setShowDesc] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const artistLine = [
    artwork.artist,
    artwork.artistNationality && `[${artwork.artistNationality}`,
    artwork.artistBirthDeath && `/ ${artwork.artistBirthDeath}]`,
  ]
    .filter(Boolean)
    .join(' ');

  const titleLine = artwork.year
    ? `${artwork.title} (${artwork.year})`
    : artwork.title;

  return (
    <>
      <div
        className="glass glass-hover rounded-xl overflow-hidden group"
        style={{ animationDelay: `${index * 60}ms` }}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted/20">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-muted/30 animate-pulse" />
          )}
          <img
            src={artwork.image}
            alt={artwork.title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={artwork.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-background/60 backdrop-blur-sm hover:bg-primary/20 transition-colors"
              title="Voir sur le site"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            {artwork.userDescription && (
              <button
                onClick={() => setShowDesc(true)}
                className="p-2 rounded-lg bg-background/60 backdrop-blur-sm hover:bg-primary/20 transition-colors"
                title="Voir description"
              >
                <FileText className="h-4 w-4" />
              </button>
            )}
            {onRemove && (
              <button
                onClick={() => onRemove(artwork.id)}
                className="p-2 rounded-lg bg-background/60 backdrop-blur-sm hover:bg-destructive/20 transition-colors"
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </button>
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">
            {titleLine}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {artistLine}
          </p>
        </div>
      </div>

      <Dialog open={showDesc} onOpenChange={setShowDesc}>
        <DialogContent className="glass border-glass-border">
          <DialogHeader>
            <DialogTitle>{artwork.title}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {artwork.userDescription}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
