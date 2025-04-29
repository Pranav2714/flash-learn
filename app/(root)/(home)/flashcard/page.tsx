"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface FlashcardData {
  id: string;
  front: string;
  back: string;
}

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({});

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashCard() {
      if (!user || !search) return;
      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards: FlashcardData[] = [];

      docs.forEach((doc) => {
        const data = doc.data() as Omit<FlashcardData, "id">;
        flashcards.push({ ...data, id: doc.id });
      });

      setFlashcards(flashcards);
    }

    getFlashCard();
  }, [user, search]);

  const handleCardClick = (id: number) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto py-3">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Your Flashcards of set {`${search}`}{" "}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {flashcards.map((flashcard, index) => (
          <Card
            key={flashcard.id}
            className="bg-transparent shadow-none rounded-2xl hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCardClick(index)}
          >
            <CardContent>
              <div className="[perspective:1000px]">
                <div
                  className="relative w-full h-52 rounded-2xl shadow-md transition-transform duration-500 [transform-style:preserve-3d]"
                  style={{
                    transform: flipped[index]
                      ? "rotateY(180deg)"
                      : "rotateY(0deg)",
                  }}
                >
                  <div className="absolute w-full h-full bg-rose-700 text-white rounded-2xl flex justify-center items-center backface-hidden p-4">
                    <p className="text-lg font-semibold text-center">
                      {flashcard.front}
                    </p>
                  </div>
                  <div className="absolute w-full h-full bg-white text-black rounded-2xl flex justify-center items-center backface-hidden p-4 [transform:rotateY(180deg)]">
                    <p className="text-lg font-semibold text-center">
                      {flashcard.back}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
