"use client";

import { nanoid } from "nanoid";
import { useEffect, useState } from "react";


export default function Home() {

  const Animals = ["Dog", "Cat", "Rabbit", "Hamster", "Parrot", "Goldfish", "Turtle", "Lizard", "Snake", "Frog", "Guinea Pig", "Chinchilla", "Ferret", "Hedgehog"];
  const Storage_key = "private-chat-username";


  const generateRandomUsername = () => {
    const randomAnimal = Animals[Math.floor(Math.random() * Animals.length)];
    const randomID = nanoid(4);
    return `Unknown-${randomAnimal}-${randomID}`;
  }

  const [username, setUsername] = useState("Mehdi Samardan");

  useEffect(() => {
    const main =  () => {
      const storedUsername = localStorage.getItem(Storage_key);
      if (storedUsername) {
        setUsername(storedUsername);
        return;
      }

      const newUsername = generateRandomUsername();
      localStorage.setItem(Storage_key, newUsername);
      setUsername(newUsername);
    };
    main();
  }, []);


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2 ">
              <label className="flex items-center text-white">Your Identity</label>
              <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-400 font-mono">{username}</div>
            </div>
          </div>
          <button className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50">
            🔒 Create Secure Room 🔒
          </button>
        </div>
      </div>
    </main>
  );
}
