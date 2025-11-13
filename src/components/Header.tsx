import { Logo } from './Logo';
import { WalletConnect } from './WalletConnect';

export const Header = () => {
  return (
    <header className="border-b border-border glass-effect sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-medium text-foreground hidden md:block">
              Protect Your Story, Secure Your Rights.
            </h1>
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
};
