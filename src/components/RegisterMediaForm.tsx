import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Shield } from 'lucide-react';
import { toast } from 'sonner';

export const RegisterMediaForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { address, isConnected } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    licenseType: '',
    duration: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      const hash = `0x${Math.random().toString(16).substring(2, 42)}`;
      toast.success('Media rights registered successfully!', {
        description: `Content Hash: ${hash}`,
      });
      
      setFormData({ title: '', description: '', licenseType: '', duration: '' });
      setIsSubmitting(false);
      onSuccess();
    }, 2000);
  };

  return (
    <Card className="glass-effect p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Register New Media Rights</h2>
          <p className="text-sm text-muted-foreground">Encrypt and protect your digital content</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Content Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter your film or content title"
            required
            className="bg-background/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your content..."
            className="bg-background/50 min-h-24"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="licenseType">License Type *</Label>
            <Select
              value={formData.licenseType}
              onValueChange={(value) => setFormData({ ...formData, licenseType: value })}
              required
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select license type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exclusive">Exclusive Rights</SelectItem>
                <SelectItem value="non-exclusive">Non-Exclusive Rights</SelectItem>
                <SelectItem value="limited">Limited Distribution</SelectItem>
                <SelectItem value="streaming">Streaming Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">License Duration *</Label>
            <Select
              value={formData.duration}
              onValueChange={(value) => setFormData({ ...formData, duration: value })}
              required
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1year">1 Year</SelectItem>
                <SelectItem value="3years">3 Years</SelectItem>
                <SelectItem value="5years">5 Years</SelectItem>
                <SelectItem value="perpetual">Perpetual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Upload Content File</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-background/30">
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              MP4, MOV, AVI up to 500MB
            </p>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !isConnected}
          className="w-full bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 hover:scale-[1.02] py-6"
        >
          {isSubmitting ? (
            'Registering on Blockchain...'
          ) : !isConnected ? (
            'Connect Wallet to Register'
          ) : (
            'Register & Encrypt Content'
          )}
        </Button>
      </form>
    </Card>
  );
};
