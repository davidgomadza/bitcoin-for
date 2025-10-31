import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bitcoin } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="pricing" className="w-full">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-mono">Special Genesis Offer</h2>
        <p className="text-muted-foreground mt-4 text-lg">A one-time opportunity to secure your future.</p>
      </div>
      <div className="flex justify-center">
        <Card className="max-w-md w-full shadow-2xl bg-gradient-to-br from-primary/10 via-background to-background border-2 border-primary/20 hover:border-primary transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-mono">Genesis Wallet</CardTitle>
            </CardHeader>
            <CardContent className="text-center p-8">
                <div className="flex items-baseline justify-center gap-3">
                    <Bitcoin className="h-16 w-16 text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]" />
                    <p className="text-7xl font-bold font-mono">8 <span className="text-4xl text-muted-foreground">BTC</span></p>
                </div>
                <p className="text-muted-foreground my-6 text-lg">Pre-loaded in a unique J6-prefix wallet.</p>
                <div className="my-6">
                    <span className="text-lg text-muted-foreground">For a single payment of</span>
                    <p className="text-6xl font-bold text-accent drop-shadow-[0_0_15px_hsl(var(--accent))]">$64<span className="text-xl text-muted-foreground ml-2">USD</span></p>
                </div>
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
