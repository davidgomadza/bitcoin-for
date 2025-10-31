export default function Footer() {
  return (
    <footer className="py-8 px-4 md:px-6 border-t bg-background">
      <div className="container mx-auto text-center text-muted-foreground text-xs">
        <p className="max-w-4xl mx-auto mb-4">
          Disclaimer: Bitcoin verification provided by davidgomadza. All claims regarding AGT are speculative and have not been scientifically proven. This is a conceptual digital asset offering. Please proceed with caution and do your own research.
        </p>
        <p>&copy; {new Date().getFullYear()} Bitcoin Genesis Vault. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
