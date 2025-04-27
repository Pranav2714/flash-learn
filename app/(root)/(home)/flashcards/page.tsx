"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FlashcardDisplay from "@/components/FlashcardDisplay";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Card className="mb-6 bg-dark-3 text-white border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Your Created Flashcard Sets
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Flashcard display section */}
      <FlashcardDisplay user={user} />
    </div>
  );
}
