import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, Send, PiggyBank } from "lucide-react";

const steps = [
    {
        icon: PiggyBank,
        title: "Deposit Funds",
        description: "Deposit US$64 into our secure PayPal account: davidgomadza@hotmail.com to initiate wallet creation."
    },
    {
        icon: KeyRound,
        title: "Receive Your Key",
        description: "Upon payment confirmation, you'll receive your unique 12-word recovery phrase. Guard it carefully."
    },
    {
        icon: Send,
        title: "Access & Transfer",
        description: "Use your phrase to unlock your wallet. For maximum security, immediately transfer your 8 BTC to a personal wallet."
    }
]

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="w-full">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-4xl md:text-5xl font-bold font-mono">How To Get Your Wallet</h2>
                <p className="text-muted-foreground mt-4 text-lg">A simple, three-step process to your digital legacy.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <Card key={index} className="flex flex-col items-center text-center p-8 shadow-lg bg-card/50 border border-transparent hover:border-primary transition-colors duration-300">
                        <div className="p-4 bg-primary/10 rounded-full mb-6 ring-8 ring-primary/5">
                            <step.icon className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold font-mono mb-3">Step {index + 1}: {step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                    </Card>
                ))}
            </div>
        </section>
    )
}
