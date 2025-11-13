import { Film, Shield, Calendar, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MediaAssetCardProps {
  title: string;
  owner: string;
  licenseType: string;
  registrationDate: string;
  contentHash: string;
  thumbnail?: string;
}

export const MediaAssetCard = ({
  title,
  owner,
  licenseType,
  registrationDate,
  contentHash,
  thumbnail,
}: MediaAssetCardProps) => {
  return (
    <Card className="glass-effect hover:shadow-card transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 bg-gradient-secondary overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Film className="h-20 w-20 text-muted-foreground/20" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary text-primary-foreground shadow-glow">
            <Shield className="h-3 w-3 mr-1" />
            Encrypted
          </Badge>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground font-mono truncate">
            Hash: {contentHash}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">Owner:</span>
            <span className="text-foreground font-medium truncate">{owner}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-secondary" />
            <span className="text-muted-foreground">License:</span>
            <Badge variant="outline" className="bg-secondary/10 text-secondary">
              {licenseType}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Registered:</span>
            <span className="text-foreground">{registrationDate}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
