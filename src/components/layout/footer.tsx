import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-8 px-4 md:px-6 border-t bg-background">
      <div className="container mx-auto text-center text-muted-foreground text-xs">
        <p className="max-w-4xl mx-auto mb-4">
          Disclaimer: Bitcoin verification provided by davidgomadza. All claims regarding AGT are speculative and have not been scientifically proven. This is a conceptual digital asset offering. Please proceed with caution and do your own research.
        </p>
        <div className="flex justify-center gap-x-4 mb-4">
            <Link href="https://bitcoinayt.world" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                bitcoinayt.world
            </Link>
            <Link href="https://twofuture.world" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                twofuture.world
            </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Bitcoin Genesis Vault. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
