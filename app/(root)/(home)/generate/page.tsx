"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface FlashcardData {
  id: string;
  front: string;
  back: string;
}

const GenerateAiCard = () => {
  const [inputText, setInputText] = useState("");
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
        </div>
      )}
    </section>
  );
};

export default GenerateAiCard;
