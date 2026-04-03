import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import MuseumCard from '@/components/MuseumCard';
import MuseumModal from '@/components/MuseumModal';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Plus, Landmark } from 'lucide-react';
import type { Museum } from '@/types/artwork';

export default function MuseumsPage() {
  const { museums, addMuseum, updateMuseum, removeMuseum } = useAppStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Museum | null>(null);

  const handleEdit = (museum: Museum) => {
    setEditing(museum);
    setModalOpen(true);
  };

  const handleSave = (data: Omit<Museum, 'id'> & { id?: string }) => {
    if (data.id) {
      updateMuseum(data.id, data);
    } else {
      addMuseum({ ...data, id: crypto.randomUUID() });
    }
    setEditing(null);
  };

  const handleOpenNew = () => {
    setEditing(null);
    setModalOpen(true);
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold glow-text">Musées</h1>
          <p className="text-muted-foreground mt-1">
            Gérez votre collection de musées
          </p>
        </div>
        <Button onClick={handleOpenNew} className="gap-1">
          <Plus className="h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {museums.length === 0 ? (
        <EmptyState
          icon={<Landmark className="h-16 w-16" />}
          title="Aucun musée"
          description="Ajoutez vos musées préférés à votre collection."
          action={
            <Button onClick={handleOpenNew}>
              <Plus className="h-4 w-4 mr-1" />
              Ajouter un musée
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {museums.map((museum, i) => (
            <MuseumCard
              key={museum.id}
              museum={museum}
              onEdit={handleEdit}
              onRemove={removeMuseum}
              index={i}
            />
          ))}
        </div>
      )}

      <MuseumModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        museum={editing}
        onSave={handleSave}
      />
    </div>
  );
}
