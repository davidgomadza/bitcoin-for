"use client";

import { Bitcoin, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const handleScroll = (id: string) => {
    const nextSection = document.getElementById(id);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="py-4 px-4 md:px-6 border-b sticky top-0 bg-background/80 backdrop-blur-lg z-20">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Bitcoin className="h-8 w-8 text-primary" />
          <h1 className="text-xl md:text-2xl font-bold font-mono text-foreground">
            Bitcoin Genesis Vault
          </h1>
        </Link>
        {pathname === '/' && (
            <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={() => handleScroll('pricing')}>Offer</Button>
            <Button variant="ghost" onClick={() => handleScroll('how-it-works')}>How It Works</Button>
            <Button variant="ghost" onClick={() => handleScroll('wallet-access')}>Access Wallet</Button>
            <Button variant="ghost" onClick={() => handleScroll('agt-reward')}>AGT Reward</Button>
            </nav>
        )}
        {pathname === '/transfer' && (
            <Link href="/transfer">
                <Button variant="outline">
                    <Send className="mr-2 h-4 w-4"/>
                    Transfer
                </Button>
            </Link>
        )}
      </div>
    </header>
  );
}
