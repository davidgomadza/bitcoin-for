"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, ExternalLink } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

const transferSchema = z.object({
  recipientAddress: z.string().min(26, "Invalid Bitcoin address").max(62, "Invalid Bitcoin address"),
  amount: z.coerce.number().positive("Amount must be positive").max(8, "Cannot transfer more than 8 BTC."),
});

const externalWallets = [
    { name: "Electrum", url: "https://electrum.org/", description: "A popular, feature-rich desktop wallet." },
    { name: "Bitcoin.com Wallet", url: "https://www.bitcoin.com/wallet/", description: "A user-friendly mobile and desktop wallet." },
    { name: "Exodus", url: "https://www.exodus.com/", description: "A multi-currency wallet with a beautiful interface." },
];

export default function TransferSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransferred, setIsTransferred] = useState(false);
  const [txId, setTxId] = useState("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof transferSchema>>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      recipientAddress: "",
      amount: 8.0,
    },
  });

  const onSubmit = (values: z.infer<typeof transferSchema>) => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Simulate a successful transaction
      const simulatedTxId = `tx_${Math.random().toString(36).substr(2, 64)}`;
      setTxId(simulatedTxId);
      setIsTransferred(true);
      
      toast({
          title: "Transfer Successful!",
          description: `${values.amount} BTC sent to ${values.recipientAddress.substring(0, 12)}...`,
      });

      setIsLoading(false);
    }, 3000); // Simulate network delay for transaction
  };
  
  if(isTransferred) {
    return (
        <Alert variant="default" className="max-w-2xl mx-auto border-green-500/50 text-green-500">
            <AlertTitle className="text-2xl font-bold font-mono flex items-center gap-3">
                <Send className="h-6 w-6"/>
                Transfer Complete
            </AlertTitle>
            <AlertDescription className="text-primary-foreground/90 mt-4 space-y-4">
                <p>
                    Your funds have been successfully broadcast to the Bitcoin network.
                </p>
                <div>
                    <label className="text-sm font-medium text-muted-foreground">Transaction ID</label>
                    <p className="text-xs font-mono break-all">{txId}</p>
                </div>
                 <Link href="/">
                    <Button variant="outline" className="w-full mt-4">Back to Home</Button>
                </Link>
            </AlertDescription>
        </Alert>
    )
  }

  return (
    <section id="transfer" className="w-full">
      <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-mono">Transfer Your Bitcoin</h2>
          <p className="text-muted-foreground mt-4 text-lg">Securely move your 8 BTC to a personal wallet.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <Card className="shadow-lg bg-card/50">
            <CardHeader>
            <CardTitle className="font-mono text-3xl flex items-center gap-3"><Send />Initiate Transfer</CardTitle>
            <CardDescription className="text-lg">Enter the destination address and amount.</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="recipientAddress"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Recipient Bitcoin Address</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter a valid Bitcoin address" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Amount (BTC)</FormLabel>
                        <FormControl>
                        <Input type="number" step="0.00000001" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Confirm and Send
                </Button>
                </form>
            </Form>
            </CardContent>
        </Card>

        <Card className="bg-card/30 border-dashed">
            <CardHeader>
                <CardTitle className="font-mono text-2xl">Recommended Wallets</CardTitle>
                <CardDescription>Need a secure wallet? Here are some trusted options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {externalWallets.map(wallet => (
                    <a key={wallet.name} href={wallet.url} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-lg hover:bg-muted/50 transition-colors">
                       <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold">{wallet.name}</h4>
                                <p className="text-sm text-muted-foreground">{wallet.description}</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                       </div>
                    </a>
                ))}
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">Always download wallets from official sources. We are not affiliated with these providers.</p>
            </CardFooter>
        </Card>

      </div>
    </section>
  );
}