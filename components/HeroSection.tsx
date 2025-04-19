"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="bg-dark-2 text-white py-16 text-center">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Main Header Text */}
        <div className="mb-6 flex flex-col items-center">
          <h1 className="text-3xl md:text-6xl font-bold">
            The ultimate <span className="text-rose-700">learning</span>
            <br />
            platform
          </h1>
        </div>

        {/* Subheader Text */}
        <div className="max-w-xl mx-auto">
          <p className="text-sm md:text-base italic leading-relaxed">
            Meet FlashLearn, the new standard for learning. Fun, fast and ads
            are thrown right out the window. Try it out!
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <Button
            onClick={() => router.push("/generate")}
            className="bg-rose-700 hover:bg-rose-800 text-white cursor-pointer"
          >
            Try AI Generate 🪄
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/manual/flashcards")}
            className="border-rose-700 text-rose-700 hover:bg-rose-100 cursor-pointer"
          >
            Create Flashcards Manually
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
