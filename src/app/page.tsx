"use client";

import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Client } from "./lib/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const Storage_key = "private-chat-username";

  const [username, setUsername] = useState("Mehdi Samardan");
  const router = useRouter();

  useEffect(() => {
    const Animals = [
      "Dog",
      "Cat",
      "Rabbit",
      "Hamster",
      "Parrot",
      "Goldfish",
      "Turtle",
      "Lizard",
      "Snake",
      "Frog",
      "Guinea Pig",
      "Chinchilla",
      "Ferret",
      "Hedgehog",
    ];

    const generateRandomUsername = () => {
      const randomAnimal = Animals[Math.floor(Math.random() * Animals.length)];
      const randomID = nanoid(4);
      const randomAdjective = [
        "Swift",
        "Clever",
        "Brave",
        "Mighty",
        "Gentle",
        "Fierce",
        "Loyal",
        "Wise",
        "Nimble",
        "Bold",
      ][Math.floor(Math.random() * 10)];
      return `${randomAdjective}-${randomAnimal}-${randomID}`;
    };

    const main = () => {
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
  }, [Storage_key]);

  const { mutate: createRoom } = useMutation({
    mutationFn: async () => {
      const res = await Client.room.create.post();
      console.log("create room response", res);

      // Try the typed field first, then fall back to parsing the raw response body
      let roomId = res?.data?.roomId;

      if (!roomId && res?.response) {
        try {
          const parsed = await res.response.clone().json();
          roomId = parsed?.roomId;
        } catch {
          // ignore parse errors
        }
      }

      if (roomId) {
        router.push(`/room/${roomId}`);
      } else {
        console.error("Failed to get roomId from response", res);
        alert("Failed to create room");
      }
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold  text-green-600 tracking-tight">
            Private Chat
          </h1>
          <p className="text-sm text-zinc-500">
            Welcome to your secure private, <br /> self-destructing chat rooms.
          </p>
        </div>
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2  ">
              <label className="flex items-center justify-center text-white">
                Your Identity
              </label>
              <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-blue-400 font-mono text-center">
                {username}
              </div>
            </div>
          </div>
          <button
            onClick={() => createRoom()}
            className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50"
          >
            🔒 Create Secure Room 🔒
          </button>
        </div>
      </div>
    </main>
  );
}
