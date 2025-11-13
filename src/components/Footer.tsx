import { useEffect, useState } from 'react';
import { Hash } from 'lucide-react';

export const Footer = () => {
  const [contentHash, setContentHash] = useState('');

  useEffect(() => {
    // Generate a random content fingerprint hash
    const generateHash = () => {
      const chars = '0123456789abcdef';
      let hash = '0x';
      for (let i = 0; i < 64; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
      }
      return hash;
    };
    
    setContentHash(generateHash());
  }, []);

  return (
    <footer className="border-t border-border glass-effect mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Hash className="h-4 w-4 text-primary" />
            <span>Content Fingerprint:</span>
            <code className="font-mono text-xs text-accent break-all">
              {contentHash}
            </code>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>© 2024 MediaVault. All rights encrypted & protected.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
