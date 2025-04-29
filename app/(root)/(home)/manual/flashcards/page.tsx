"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { db } from "@/firebase";
import { collection, doc, writeBatch, getDoc } from "firebase/firestore";
import { toast } from "sonner";

interface Flashcard {
  front: string;
  back: string;
}
interface Collection {
  name: string;
}

const ManualFlashCards = () => {
  const { user } = useUser();
  const router = useRouter();

  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { front: "", back: "" },
  ]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleFlashcardChange = (
    index: number,
    field: keyof Flashcard,
    value: string
  ) => {
    // keeping the flashcards array as it is
    const updated = [...flashcards];
    updated[index][field] = value;
    setFlashcards(updated);
  };

  const addFlashcard = () => {
    setFlashcards([...flashcards, { front: "", back: "" }]);
  };

  const saveFlashcards = async () => {
    if (!name)
      return toast.error("Please enter a name for your flashcard set.");

    if (!user) return toast.error("User not found.");

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((c: Collection) => c.name === name)) {
        toast.error("You already have a collection with this name.");
        return;
      }
      collections.push({ name });
      batch.set(userDocRef, { flashcards: collections }, { merge: true });
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((card) => {
      const cardRef = doc(colRef);
      batch.set(cardRef, card);
    });

    await batch.commit();
    setOpen(false);
    toast.success("Flashcards saved successfully!");
    router.push("/flashcards");
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-3xl bg-dark-3 rounded-2xl shadow-xl px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-white">
          Manual Flashcards
        </h1>
        <p className="text-center text-gray-400  mt-4 mb-8 text-lg">
          Create your own flashcards by entering the front and back text for
          each card.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-white">
          Input your Flashcards:
        </h2>

        {flashcards.map((card, idx) => (
          <div key={idx} className="mb-6">
            <Input
              placeholder={`Front ${idx + 1}`}
              value={card.front}
              className="mb-2 bg-gray-200 text-black"
              onChange={(e) =>
                handleFlashcardChange(idx, "front", e.target.value)
              }
            />
            <Input
              placeholder={`Back ${idx + 1}`}
              value={card.back}
              className="mb-2 bg-gray-200 text-black"
              onChange={(e) =>
                handleFlashcardChange(idx, "back", e.target.value)
              }
            />
          </div>
        ))}

        <div className="flex flex-col gap-3 mt-6">
          <Button
            onClick={addFlashcard}
            className="w-full bg-red-2 hover:bg-red-3 cursor-pointer"
          >
            Add Flashcard
          </Button>
          <Button
            variant="secondary"
            onClick={() => setOpen(true)}
            className="w-full cursor-pointer"
          >
            Save Flashcards
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] bg-dark-2 text-white border-none">
          <DialogHeader>
            <DialogTitle>Save Flashcard Set</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter flashcard set name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="my-4  bg-gray-100 text-black"
          />
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              className="bg-red-500 hover:bg-red-600"
            >
              Cancel
            </Button>
            <Button
              onClick={saveFlashcards}
              className="bg-green-500 hover:bg-green-600"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManualFlashCards;
