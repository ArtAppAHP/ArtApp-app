import { Link, useLocation } from 'react-router-dom';
import { Palette, Search, Landmark, Image } from 'lucide-react';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 glass border-b border-glass-border/50 backdrop-blur-2xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <Palette className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-12" />
            <span className="text-lg font-bold tracking-tight glow-text">ArtApp</span>
          </Link>
          <Link
            to="/recherche"
            className={`ml-2 p-2 rounded-lg transition-all duration-200 ${
              pathname === '/recherche'
                ? 'bg-primary/15 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
            }`}
          >
            <Search className="h-4 w-4" />
          </Link>
        </div>
        <nav className="flex items-center gap-1">
          {[
            { to: '/', label: 'Galerie', icon: Image },
            { to: '/musees', label: 'Musées', icon: Landmark },
          ].map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
