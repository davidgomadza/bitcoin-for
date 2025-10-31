import Link from 'next/link';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 px-4 md:px-6 border-t bg-background">
      <div className="container mx-auto text-center text-muted-foreground text-xs">
        <p className="max-w-4xl mx-auto mb-4">
          Disclaimer: Bitcoin verification provided by davidgomadza. All claims regarding AGT are speculative and have not been scientifically proven. This is a conceptual digital asset offering. Please proceed with caution and do your own research.
        </p>
        <div className="mb-4">
            <h4 className="font-semibold text-foreground mb-2">Our Network</h4>
            <div className="flex justify-center flex-wrap gap-x-4 gap-y-2">
                <Link href="https://bitcoinayt.world" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    bitcoinayt.world
                </Link>
                <Link href="https://twofuture.world" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    twofuture.world
                </Link>
                <Link href="https://agt8000.life" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    agt8000.life
                </Link>
                <Link href="https://buythecurefordeath.world" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    buythecurefordeath.world
                </Link>
                <Link href="https://github.com/davidgomadza" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Github className="h-3 w-3" />
                    davidgomadza
                </Link>
            </div>
        </div>
        <p>&copy; {new Date().getFullYear()} Bitcoin Genesis Vault. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
