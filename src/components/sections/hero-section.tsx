"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  const handleScroll = () => {
    const nextSection = document.getElementById('pricing');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 p-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
          The Genesis of a New Era
        </h1>
        <p className="mt-4 text-lg md:text-xl text-neutral-200">
          Acquire your foundational Bitcoin and unlock the key to an extended existence with AGT.
        </p>
        <Button 
          onClick={handleScroll}
          className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90" 
          size="lg"
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}
