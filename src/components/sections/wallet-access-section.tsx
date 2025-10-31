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
import { Loader2, Wallet, Copy, Check } from "lucide-react";

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
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  if (isUnlocked && walletData) {
    return (
        <section id="wallet-access" className="w-full">
            <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Your Genesis Wallet</h2>
            </div>
            <Card className="max-w-2xl mx-auto shadow-lg bg-primary/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl font-headline"><Wallet className="h-6 w-6 text-primary"/>Wallet Unlocked</CardTitle>
                    <CardDescription>For your security, transfer your funds to a personal wallet immediately.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
                        <div className="flex items-center gap-2 mt-1">
                            <Input readOnly value={walletData.address} className="font-mono text-sm"/>
                            <Button variant="outline" size="icon" onClick={handleCopy}>
                                {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Balance</label>
                        <p className="text-2xl font-bold font-headline mt-1">{walletData.balance} BTC</p>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
  }

  return (
    <section id="wallet-access" className="w-full">
        <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Access Your Wallet</h2>
            <p className="text-muted-foreground mt-2">Enter your 12-word recovery phrase to unlock your funds.</p>
        </div>
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Recovery Phrase</CardTitle>
          <CardDescription>Enter the 12 words in the correct order.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`seedPhrase.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Word {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={`#${index+1}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
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
