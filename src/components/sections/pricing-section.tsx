import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bitcoin } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="pricing" className="w-full">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Special Genesis Offer</h2>
        <p className="text-muted-foreground mt-2">One-time opportunity to secure your future.</p>
      </div>
      <div className="flex justify-center">
        <Card className="max-w-md w-full shadow-2xl border-2 border-primary/20 hover:border-primary transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-headline">Genesis Wallet</CardTitle>
            </CardHeader>
            <CardContent className="text-center p-8">
                <div className="flex items-center justify-center gap-2">
                    <Bitcoin className="h-16 w-16 text-primary" />
                    <p className="text-6xl font-bold font-headline">8 BTC</p>
                </div>
                <p className="text-muted-foreground my-4">Pre-loaded in a unique J6-prefix wallet.</p>
                <div className="my-6">
                    <span className="text-lg">For a single payment of</span>
                    <p className="text-5xl font-bold text-accent">$64<span className="text-lg text-muted-foreground ml-1">USD</span></p>
                </div>
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
