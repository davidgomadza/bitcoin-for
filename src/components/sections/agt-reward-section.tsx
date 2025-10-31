import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Zap } from "lucide-react";

export default function AgtRewardSection() {
  return (
    <section id="agt-reward" className="w-full">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">The AGT Proposition</h2>
        <p className="text-muted-foreground mt-2">A claim to the cure for death.</p>
      </div>
      <Card className="shadow-lg max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <ShieldCheck className="h-6 w-6 text-primary"/>
            Your Path to Immortality
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-base md:text-lg">
          <p>
            Buying this Bitcoin entitles you to a claim for the cure for death: the <strong className="text-primary">AGT (Anti-Gene of Thanatos)</strong>. The amount of BTC you buy is equivalent to the AGT you receive.
          </p>
          <div className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-lg">
            <h4 className="font-bold font-headline text-xl flex items-center gap-2"><Zap className="h-5 w-5 text-accent" />The Ultimate Goal</h4>
            <p className="mt-2">
              You need <strong className="text-primary">8,000 AGT</strong> to live on Earth forever, or at least for 8,000 years, in perfect health.
            </p>
          </div>
          <p>
            To qualify, you must hold <strong className="text-primary">8,000 Bitcoin</strong>. This holding grants you 8,000 AGT, which is said to provide:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-muted-foreground">
            <li>No death and the removal of old age.</li>
            <li>Reversal of menopause and its male equivalent, 'ajvo'.</li>
            <li>Complete rejuvenation of the body back to its created state.</li>
            <li>Removal of the mechanism of death from the body.</li>
            <li>The removal of the clock to Ya.</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
