"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { correctSeedPhrase, generateMockWallet } from "@/lib/wallet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wallet, Copy, Check, Send } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  seedPhrase: z.array(z.object({ value: z.string().min(1, "Word is required.") })).length(12, "12 words are required."),
});

type WalletData = {
  address: string;
  balance: string;
};

export default function WalletAccessSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seedPhrase: Array(12).fill({ value: "" }),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "seedPhrase",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const enteredPhrase = values.seedPhrase.map(word => word.value.trim().toLowerCase());
    
    setTimeout(() => {
      if (JSON.stringify(enteredPhrase) === JSON.stringify(correctSeedPhrase)) {
        const newWallet = generateMockWallet();
        setWalletData(newWallet);
        setIsUnlocked(true);
        toast({
            title: "Success!",
            description: "Wallet unlocked.",
            variant: "default",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "The 12-word phrase is incorrect. Please try again.",
        });
        form.reset();
      }
      setIsLoading(false);
    }, 2000); // Simulate network delay
  };

  const handleCopy = () => {
    if (walletData) {
      navigator.clipboard.writeText(walletData.address);
      setHasCopied(true);
      toast({ title: "Copied!", description: "Wallet address copied to clipboard." });
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  if (isUnlocked && walletData) {
    return (
        <section id="wallet-access" className="w-full">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-4xl md:text-5xl font-bold font-mono">Your Genesis Wallet</h2>
            </div>
            <Card className="max-w-2xl mx-auto shadow-lg bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-3xl font-mono"><Wallet className="h-8 w-8 text-primary"/>Wallet Unlocked</CardTitle>
                    <CardDescription className="text-lg">For your security, transfer your funds to a personal wallet immediately.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
                        <div className="flex items-center gap-2 mt-1">
                            <Input readOnly value={walletData.address} className="font-mono text-base bg-muted/50"/>
                            <Button variant="outline" size="icon" onClick={handleCopy}>
                                {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Balance</label>
                        <p className="text-4xl font-bold font-mono mt-1">{walletData.balance} BTC</p>
                    </div>
                    <Link href="/transfer" className="w-full">
                      <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        <Send className="mr-2 h-4 w-4" />
                        Transfer Funds
                      </Button>
                    </Link>
                </CardContent>
            </Card>
        </section>
    );
  }

  return (
    <section id="wallet-access" className="w-full">
        <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-mono">Access Your Wallet</h2>
            <p className="text-muted-foreground mt-4 text-lg">Enter your 12-word recovery phrase to unlock your funds.</p>
        </div>
      <Card className="max-w-3xl mx-auto shadow-lg bg-card/50">
        <CardHeader>
          <CardTitle className="font-mono text-3xl">Recovery Phrase</CardTitle>
          <CardDescription className="text-lg">Enter the 12 words in the correct order.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`seedPhrase.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Word {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={`#${index+1}`} className="font-mono text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button type="submit" disabled={isLoading} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Unlock Wallet
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
