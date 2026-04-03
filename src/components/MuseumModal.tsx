import type { Museum } from '@/types/artwork';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  museum?: Museum | null;
  onSave: (data: Omit<Museum, 'id'> & { id?: string }) => void;
}

export default function MuseumModal({ open, onOpenChange, museum, onSave }: Props) {
  const [form, setForm] = useState({ name: '', location: '', imageUrl: '', websiteUrl: '' });

  useEffect(() => {
    if (museum) {
      setForm({ name: museum.name, location: museum.location, imageUrl: museum.imageUrl, websiteUrl: museum.websiteUrl });
    } else {
      setForm({ name: '', location: '', imageUrl: '', websiteUrl: '' });
    }
  }, [museum, open]);

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onSave({ ...form, id: museum?.id });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-glass-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{museum ? 'Modifier le musée' : 'Ajouter un musée'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label htmlFor="museum-name">Nom</Label>
            <Input id="museum-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="bg-secondary/50 border-glass-border" placeholder="Musée du Louvre" />
          </div>
          <div>
            <Label htmlFor="museum-location">Ville / Pays</Label>
            <Input id="museum-location" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} className="bg-secondary/50 border-glass-border" placeholder="Paris, France" />
          </div>
          <div>
            <Label htmlFor="museum-image">URL de l'image</Label>
            <Input id="museum-image" value={form.imageUrl} onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))} className="bg-secondary/50 border-glass-border" placeholder="https://..." />
          </div>
          <div>
            <Label htmlFor="museum-url">URL du site web</Label>
            <Input id="museum-url" value={form.websiteUrl} onChange={(e) => setForm((f) => ({ ...f, websiteUrl: e.target.value }))} className="bg-secondary/50 border-glass-border" placeholder="https://..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button onClick={handleSubmit}>{museum ? 'Modifier' : 'Ajouter'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
