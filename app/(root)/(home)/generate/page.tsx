"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import { toast } from "sonner";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { db } from "@/firebase";
interface FlashcardData {
  id: string;
  front: string;
  back: string;
}

const GenerateAiCard = () => {
  const router = useRouter();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [inputText, setInputText] = useState("");
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const handleSubmit = async () => {
    fetch("/api/generate", {
      method: "POST",
      body: inputText,
    })
      .then((res) => res.json() as Promise<FlashcardData[]>)
      .then((data) => setFlashcards(data))
      .catch((err) => console.error(err));
  };
  const handleCardClick = (index: number) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const saveFlashcards = async () => {
    if (!name) {
      toast.error("Please enter a name for your flashcard set.");
      return;
    }
    const batch = writeBatch(db);
    const userDocref = doc(collection(db, "users"), user?.id!);
    const flashcollRef = await getDoc(userDocref);
    if (flashcollRef.exists()) {
      const collections = flashcollRef.data().flashcards || [];
      if (collections.find((f: any) => f.name === name)) {
        toast.warning(
          "You already have a collection with this name. Please choose a different name."
        );
        return;
      } else {
        collections.push({ name });
        batch.set(userDocref, { flashcards: collections }, { merge: true });
      }
    }
    const colref = collection(userDocref, name);
    flashcards.forEach((flashcard) => {
      const flashcradRef = doc(colref);
      batch.set(flashcradRef, flashcard);
    });
    console.log("Saving flashcards with name:", name);
    await batch.commit();
    handleClose();
    toast.success("Flashcards saved successfully!");
    router.push("/flashcards");
  };

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <section className="bg-dark-2 text-white  text-center flex flex-col flex-center">
      <h1 className="text-3xl md:text-6xl font-bold">
        Empower Your Learning -<span className="text-rose-700">Instantly </span>
        <br />
      </h1>
      <div className="w-full max-w-3xl bg-dark-3 rounded-2xl shadow-xl px-6 py-16 mt-10 flex flex-col justify-center">
        <h1 className="md:text-3xl font-bold ">Generate flashcards</h1>
        <p className="text-center text-gray-400  mt-4 mb-8 text-lg">
          Enter any topic you want to study. We will generate flashcards for
          you.
        </p>
        <Input
          placeholder={`Enter a topic to study eg. "History of AI" or "Python Basics"`}
          value={inputText}
          className="mb-2 bg-gray-200 text-black"
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button
          className="bg-red-2 hover:bg-red-3 cursor-pointer mt-3 font-bold width-fit self-center"
          onClick={handleSubmit}
        >
          Generate Flashcards
        </Button>
      </div>
      {flashcards.length > 0 && (
        <div className="mt-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold italic text-white mb-6">
            Here are some flashcards we generated for you.
            <br />
            Let's see how well you know them!
          </h2>
          {/* **************************--------------- */}
          <div className="flex flex-col items-center justify-center p-6">
            {flashcards.length > 0 && (
              <div className="flex flex-col items-center">
                {/* Carousel */}
                <Carousel className="w-[550px]" setApi={setApi}>
                  <CarouselContent>
                    {flashcards.map((flashcard, index) => (
                      <CarouselItem key={index} className="flex justify-center">
                        <div
                          onClick={() => handleCardClick(index)}
                          className={`relative w-[500px] h-[300px] transition-transform duration-500 ease-in-out ${
                            flippedIndex === index ? "rotate-y-180" : ""
                          } [transform-style:preserve-3d]`}
                          style={{ perspective: "1000px" }}
                        >
                          {/* Front Side */}
                          <Card className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 rounded-xl bg-rose-600 text-white text-center border-none">
                            <h2 className="text-lg font-semibold">
                              {flashcard.front}
                            </h2>
                          </Card>

                          {/* Back Side */}
                          <Card className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6 rounded-xl bg-white text-black text-center border-none">
                            <h2 className="text-lg font-semibold">
                              {flashcard.back}
                            </h2>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="ml-[-2.5rem] bg-dark-2 border-none" />
                  <CarouselNext className="mr-[-2.5rem] bg-dark-2 border-none" />
                </Carousel>
                <div className="py-2 text-center text-sm text-muted-foreground">
                  Card {current} of {count}
                </div>
                {/* Save Flashcards Button */}
                <Button
                  variant="default"
                  className="mt-6 bg-white text-black font-semibold hover:bg-gray-300"
                  onClick={handleOpen}
                >
                  Save Flashcards
                </Button>
              </div>
            )}

            {/* Save Dialog */}
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
        </div>
      )}
    </section>
  );
};

export default GenerateAiCard;
