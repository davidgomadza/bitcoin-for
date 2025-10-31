import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import HowItWorksSection from '@/components/sections/how-it-works-section';
import PricingSection from '@/components/sections/pricing-section';
import AgtRewardSection from '@/components/sections/agt-reward-section';
import WalletAccessSection from '@/components/sections/wallet-access-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <div className="container mx-auto px-4 space-y-16 md:space-y-24 py-16 md:py-24">
            <PricingSection />
            <HowItWorksSection />
            <WalletAccessSection />
            <AgtRewardSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
