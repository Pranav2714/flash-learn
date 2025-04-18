"use client";

import { useUser } from "@clerk/nextjs";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
// import FlashcardDisplay from "@/components/FlashcardDisplay";
// import Footer from "@/components/Footer";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="relative flex flex-col min-h-screen bg-dark-2 text-white overflow-x-hidden">
      {/* Main content */}
      <main className="flex-grow relative z-10">
        <HeroSection />

        <Features />

        {user && (
          <section className="py-12 px-4 md:px-8 bg-dark-2">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">Your Flashcard Sets</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Here are the flashcard sets you have created. Click on a card to
                view details.
              </p>
            </div>

            {/* <FlashcardDisplay user={user} /> */}
          </section>
        )}
      </main>

      {/* Background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-[50vw] h-[50vh] rounded-[20%] bg-gradient-to-t from-black to-rose-700 opacity-10 blur-[70px]" />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] rounded-[20%] bg-gradient-to-t from-black to-rose-700 opacity-10 blur-[70px]" />
        {/* Optional: Slight middle background glow */}
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 w-[40vw] h-[40vh] rounded-[30%] bg-gradient-to-t from-black to-rose-700 opacity-10 blur-[80px]" />
      </div>
    </div>
  );
}
