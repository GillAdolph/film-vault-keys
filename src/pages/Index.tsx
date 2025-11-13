import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MediaAssetCard } from '@/components/MediaAssetCard';
import { RegisterMediaForm } from '@/components/RegisterMediaForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Film, Plus, Grid } from 'lucide-react';

const SAMPLE_ASSETS = [
  {
    title: 'The Midnight Chronicle',
    owner: '0x1234...5678',
    licenseType: 'Exclusive Rights',
    registrationDate: '2024-01-15',
    contentHash: '0xab12...cd34',
  },
  {
    title: 'Silicon Dreams',
    owner: '0x9876...4321',
    licenseType: 'Streaming Only',
    registrationDate: '2024-02-20',
    contentHash: '0xef56...gh78',
  },
  {
    title: 'Urban Legends: Origins',
    owner: '0xabcd...ef01',
    licenseType: 'Limited Distribution',
    registrationDate: '2024-03-10',
    contentHash: '0xij90...kl12',
  },
];

const Index = () => {
  const { isConnected } = useAccount();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-secondary">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Encrypted Media Rights Registry
          </h2>
          <p className="text-muted-foreground">
            Secure, trace, and manage your digital content ownership on the blockchain
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="glass-effect mb-6">
            <TabsTrigger value="dashboard" className="gap-2">
              <Grid className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="register" className="gap-2">
              <Plus className="h-4 w-4" />
              Register New
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {!isConnected ? (
              <div className="glass-effect rounded-lg p-12 text-center">
                <Film className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Connect Your Wallet
                </h3>
                <p className="text-muted-foreground">
                  Connect your wallet to view and manage your registered media assets
                </p>
              </div>
            ) : (
              <>
                <div className="glass-effect rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground">Your Registered Assets</h3>
                    <span className="text-sm text-muted-foreground">
                      {SAMPLE_ASSETS.length} items
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SAMPLE_ASSETS.map((asset, index) => (
                    <MediaAssetCard key={`${refreshKey}-${index}`} {...asset} />
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="register">
            <RegisterMediaForm onSuccess={() => setRefreshKey(k => k + 1)} />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
