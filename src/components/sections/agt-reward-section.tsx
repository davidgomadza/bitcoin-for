import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Zap, Gem } from "lucide-react";

export default function AgtRewardSection() {
  return (
    <section id="agt-reward" className="w-full">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-mono">The AGT Proposition</h2>
        <p className="text-muted-foreground mt-4 text-lg">A claim to the cure for death.</p>
      </div>
      <Card className="shadow-lg max-w-4xl mx-auto bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-mono text-3xl">
            <Gem className="h-8 w-8 text-primary"/>
            Your Path to Immortality
          </CardTitle>
          <CardDescription className="text-lg">Acquire AGT and secure your future.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-lg md:text-xl">
          <p>
            Buying this Bitcoin entitles you to a claim for the cure for death: the <strong className="text-primary font-semibold">AGT (Advanced GeneticSynthesis Technology)</strong>. The amount of BTC you buy is equivalent to the AGT you receive.
          </p>
          <div className="border-l-4 border-accent pl-4 py-3 bg-accent/10 rounded-r-lg">
            <h4 className="font-bold font-mono text-2xl flex items-center gap-2"><Zap className="h-6 w-6 text-accent" />The Ultimate Goal</h4>
            <p className="mt-2 text-primary-foreground/80">
              You need <strong className="text-accent font-semibold">8,000 AGT</strong> to live on Earth forever, or at least for 8,000 years, in perfect health.
            </p>
          </div>
          <p>
            To qualify, you must hold <strong className="text-primary font-semibold">8,000 Bitcoin</strong>. This holding grants you 8,000 AGT, which is said to provide:
          </p>
          <ul className="list-disc list-inside space-y-3 pl-4 text-muted-foreground">
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
