import type { Artwork } from '@/types/artwork';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  artwork: Artwork;
  onAdd: (artwork: Artwork) => void;
  alreadySaved: boolean;
  index?: number;
}

export default function SearchResultCard({ artwork, onAdd, alreadySaved, index = 0 }: Props) {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState('');
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleSave = () => {
    onAdd({ ...artwork, userDescription: desc || undefined });
    setOpen(false);
    setDesc('');
  };

  return (
    <>
      <div
        className="glass glass-hover rounded-xl overflow-hidden group animate-fade-in"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted/20">
          {!imgLoaded && <div className="absolute inset-0 bg-muted/30 animate-pulse" />}
          <img
            src={artwork.image}
            alt={artwork.title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">{artwork.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{artwork.artist}</p>
          <Button
            size="sm"
            className="w-full mt-3"
            disabled={alreadySaved}
            onClick={() => setOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            {alreadySaved ? 'Déjà sauvegardé' : 'Ajouter'}
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="glass border-glass-border sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Ajouter à la galerie</DialogTitle>
          </DialogHeader>
          <div className="flex gap-4">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-32 h-44 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{artwork.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{artwork.artist}</p>
              {artwork.year && (
                <p className="text-xs text-muted-foreground">{artwork.year}</p>
              )}
            </div>
          </div>
          <Textarea
            placeholder="Ajouter une description personnelle…"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="bg-secondary/50 border-glass-border"
            rows={3}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave}>Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
