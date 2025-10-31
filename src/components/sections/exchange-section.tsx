"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Repeat, CreditCard, ArrowRight } from "lucide-react";

const buySchema = z.object({
  usdAmount: z.coerce.number().min(5, "Minimum purchase is $5.00"),
  cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvc: z.string().regex(/^\d{3,4}$/, "Invalid CVC"),
});

const exchangeSchema = z.object({
    fromAmount: z.coerce.number().positive(),
    fromAsset: z.string(),
    toAsset: z.string(),
});

const cryptoAssets = [
    { id: "BTC", name: "Bitcoin" },
    { id: "ETH", name: "Ethereum" },
    { id: "USDT", name: "Tether" },
    { id: "BNB", name: "Binance Coin" },
];

const exchangeRates: {[key: string]: number} = {
    "BTC": 68000,
    "ETH": 3500,
    "USDT": 1,
    "BNB": 600,
}

export default function ExchangeSection() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const buyForm = useForm<z.infer<typeof buySchema>>({
    resolver: zodResolver(buySchema),
    defaultValues: {
      usdAmount: 50,
    },
  });

  const exchangeForm = useForm<z.infer<typeof exchangeSchema>>({
    resolver: zodResolver(exchangeSchema),
    defaultValues: {
      fromAmount: 0.1,
      fromAsset: 'BTC',
      toAsset: 'ETH',
    },
  });

  const onBuySubmit = (values: z.infer<typeof buySchema>) => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Purchase Successful!",
        description: `You purchased ${(values.usdAmount / exchangeRates.BTC).toFixed(6)} BTC.`,
      });
      setIsLoading(false);
      buyForm.reset();
    }, 2000);
  };

  const onExchangeSubmit = (values: z.infer<typeof exchangeSchema>) => {
    setIsLoading(true);
    setTimeout(() => {
      const fromRate = exchangeRates[values.fromAsset];
      const toRate = exchangeRates[values.toAsset];
      const toAmount = (values.fromAmount * fromRate) / toRate;
      
      toast({
        title: "Exchange Successful!",
        description: `You exchanged ${values.fromAmount} ${values.fromAsset} for ${toAmount.toFixed(6)} ${values.toAsset}.`,
      });
      setIsLoading(false);
      exchangeForm.reset();
    }, 2000);
  };

  const fromAmount = exchangeForm.watch("fromAmount") || 0;
  const fromAsset = exchangeForm.watch("fromAsset");
  const toAsset = exchangeForm.watch("toAsset");
  
  const calculatedToAmount = () => {
    if(!fromAsset || !toAsset) return 0;
    const fromRate = exchangeRates[fromAsset];
    const toRate = exchangeRates[toAsset];
    return (fromAmount * fromRate) / toRate;
  }

  return (
    <section id="exchange" className="w-full">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-mono">BUY BITCOIN TODAY</h2>
        <p className="text-muted-foreground mt-4 text-lg">Instantly buy or exchange crypto assets.</p>
      </div>

      <Card className="max-w-2xl mx-auto shadow-lg bg-card/50">
        <Tabs defaultValue="buy" className="w-full">
          <CardHeader>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buy"><CreditCard className="mr-2"/>Buy with Card</TabsTrigger>
              <TabsTrigger value="exchange"><Repeat className="mr-2"/>Exchange</TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <TabsContent value="buy">
            <CardContent>
                <Form {...buyForm}>
                    <form onSubmit={buyForm.handleSubmit(onBuySubmit)} className="space-y-6">
                        <FormField
                            control={buyForm.control}
                            name="usdAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount (USD)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="50.00" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={buyForm.control}
                            name="cardNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Card Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0000 0000 0000 0000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={buyForm.control}
                                name="expiry"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expiry</FormLabel>
                                    <FormControl>
                                    <Input placeholder="MM/YY" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={buyForm.control}
                                name="cvc"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CVC</FormLabel>
                                    <FormControl>
                                    <Input placeholder="123" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Buy Bitcoin
                        </Button>
                    </form>
                </Form>
            </CardContent>
          </TabsContent>

          <TabsContent value="exchange">
            <CardContent>
                <Form {...exchangeForm}>
                    <form onSubmit={exchangeForm.handleSubmit(onExchangeSubmit)} className="space-y-6">
                        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
                             <FormField
                                control={exchangeForm.control}
                                name="fromAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>From</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={exchangeForm.control}
                                name="fromAsset"
                                render={({ field }) => (
                                    <FormItem className="mt-8">
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select asset"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {cryptoAssets.map(asset => (
                                                    <SelectItem key={asset.id} value={asset.id}>{asset.id}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-center items-end h-full">
                               <ArrowRight className="h-5 w-5 text-muted-foreground self-center mt-6" />
                            </div>
                            <FormItem>
                                <FormLabel>To</FormLabel>
                                <Input type="number" readOnly value={calculatedToAmount().toFixed(6)} className="bg-muted/50" />
                            </FormItem>
                             <FormField
                                control={exchangeForm.control}
                                name="toAsset"
                                render={({ field }) => (
                                    <FormItem className="mt-8">
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select asset" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {cryptoAssets.map(asset => (
                                                    <SelectItem key={asset.id} value={asset.id}>{asset.id}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                       
                        <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Exchange Now
                        </Button>
                    </form>
                </Form>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </section>
  );
}
