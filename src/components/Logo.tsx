import { Film, Lock } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 group">
      <div className="relative">
        <Film className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
        <Lock className="h-4 w-4 text-accent absolute -bottom-1 -right-1 transition-transform group-hover:scale-110" />
      </div>
      <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        MediaVault
      </span>
    </div>
  );
};
