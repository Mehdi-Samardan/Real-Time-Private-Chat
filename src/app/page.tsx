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
    const SuperHeros = [
      "Superman",
      "Batman",
      "Wonder Woman",
      "Spider-Man",
      "Iron Man",
      "Captain America",
      "Thor",
      "Hulk",
      "Black Widow",
      "Green Lantern",
      "Flash",
      "Aquaman",
      "Black Panther",
      "Doctor Strange",
    ];

    const generateRandomUsername = () => {
      const randomHero = SuperHeros[Math.floor(Math.random() * SuperHeros.length)];
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
      return `${randomAdjective}-${randomHero}-${randomID}`;
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
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Private Chat
          </h1>
          <p className="text-slate-600 text-base">
            Secure, private, self-destructing messages
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Your Identity
            </label>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center text-sm font-mono text-slate-700 break-all">
              {username}
            </div>
          </div>
          
          <button
            onClick={() => createRoom()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Create Room
          </button>
        </div>
      </div>
    </main>
  );
}


    // <main className="flex min-h-screen flex-col items-center justify-center p-4">
    //   <div className="w-full max-w-md space-y-8">
    //     <div className="text-center space-y-2">
    //       <h1 className="text-3xl font-extrabold  text-green-600 tracking-tight">
    //         Private Chat
    //       </h1>
    //       <p className="text-sm text-zinc-500">
    //         Welcome to your secure private, <br /> self-destructing chat rooms.
    //       </p>
    //     </div>
    //     <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
    //       <div className="space-y-5">
    //         <div className="space-y-2  ">
    //           <label className="flex items-center justify-center text-white">
    //             Your Identity
    //           </label>
    //           <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-blue-400 font-mono text-center">
    //             {username}
    //           </div>
    //         </div>
    //       </div>
    //       <button
    //         onClick={() => createRoom()}
    //         className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50"
    //       >
    //         🔒 Create Secure Room 🔒
    //       </button>
    //     </div>
    //   </div>
    // </main>