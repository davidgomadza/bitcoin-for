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
    <section className="relative h-[80vh] md:h-screen w-full flex items-center justify-center text-center text-white overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-contain object-center scale-125"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="relative z-10 p-4 max-w-4xl mx-auto -mt-24">
        <h1 className="text-5xl md:text-6xl font-bold font-mono tracking-tighter">
          The Genesis of a New Era
        </h1>
        <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
          Acquire your foundational Bitcoin and unlock the key to an extended existence with AGT.
        </p>
        <Button 
          onClick={handleScroll}
          className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 transform hover:scale-105 transition-transform duration-300" 
          size="lg"
        >
          Begin Your Journey
        </Button>
      </div>
    </section>
  );
}
