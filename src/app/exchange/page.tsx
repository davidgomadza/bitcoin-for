import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ExchangeSection from '@/components/sections/exchange-section';

export default function ExchangePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <ExchangeSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
