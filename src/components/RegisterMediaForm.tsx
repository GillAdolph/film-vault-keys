import { useState, useRef } from 'react';
import { useAccount } from 'wagmi';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Shield, X, FileVideo } from 'lucide-react';
import { toast } from 'sonner';

export const RegisterMediaForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { address, isConnected } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    licenseType: '',
    duration: '',
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
      if (!validTypes.includes(file.type)) {
        toast.error('Invalid file type. Please upload MP4, MOV, or AVI files.');
        return;
      }
      
      // Validate file size (500MB)
      const maxSize = 500 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('File size exceeds 500MB limit.');
        return;
      }
      
      setSelectedFile(file);
      toast.success(`File "${file.name}" selected successfully`);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!selectedFile) {
      toast.error('Please upload a content file');
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
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
          <Label>Upload Content File *</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/quicktime,video/x-msvideo,.mp4,.mov,.avi"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          
          {!selectedFile ? (
            <label
              htmlFor="file-upload"
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-background/30 block"
            >
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                MP4, MOV, AVI up to 500MB
              </p>
            </label>
          ) : (
            <div className="border-2 border-primary/30 rounded-lg p-4 bg-primary/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded">
                    <FileVideo className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
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
