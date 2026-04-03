import type { Museum } from '@/types/artwork';
import { ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
  museum: Museum;
  onEdit: (museum: Museum) => void;
  onRemove: (id: string) => void;
  index?: number;
}

export default function MuseumCard({ museum, onEdit, onRemove, index = 0 }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className="glass glass-hover rounded-xl overflow-hidden group animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative aspect-video overflow-hidden bg-muted/20">
        {!imgLoaded && <div className="absolute inset-0 bg-muted/30 animate-pulse" />}
        <img
          src={museum.imageUrl}
          alt={museum.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(museum)}
            className="p-2 rounded-lg bg-background/60 backdrop-blur-sm hover:bg-primary/20 transition-colors"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onRemove(museum.id)}
            className="p-2 rounded-lg bg-background/60 backdrop-blur-sm hover:bg-destructive/20 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5 text-destructive" />
          </button>
        </div>
      </div>
      <a
        href={museum.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 group/link"
      >
        <h3 className="font-semibold text-sm flex items-center gap-1">
          {museum.name}
          <ExternalLink className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">{museum.location}</p>
      </a>
    </div>
  );
}
