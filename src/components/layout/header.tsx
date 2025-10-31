import { Bitcoin } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-4 px-4 md:px-6 border-b sticky top-0 bg-background/95 backdrop-blur z-20">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Bitcoin className="h-8 w-8 text-primary" />
          <h1 className="text-xl md:text-2xl font-bold font-headline text-foreground">
            Bitcoin Genesis Vault
          </h1>
        </Link>
      </div>
    </header>
  );
}
