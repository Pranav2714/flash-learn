"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { UserResource } from "@clerk/types";

interface Flashcard {
  name: string;
}
interface FlashcardDisplayProps {
  user: UserResource;
}

export default function FlashcardDisplay({ user }: FlashcardDisplayProps) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashCards() {
      if (!user) return;

      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }

    getFlashCards();
  }, [user]);

  const handleCardClick = (id: string) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
      {flashcards.map((flashcard, index) => (
        <Card
          key={index}
          className="cursor-pointer transition-shadow hover:shadow-xl max-w-xs mx-auto"
          onClick={() => handleCardClick(flashcard.name)}
        >
          <CardContent className="h-[100px] flex items-center justify-center bg-muted rounded-xl">
            <CardTitle className="text-center text-lg font-semibold">
              {flashcard.name}
            </CardTitle>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
