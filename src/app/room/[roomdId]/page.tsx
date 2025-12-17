"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const formatTimeRamaining = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const Page = () => {
  const params = useParams();
  const { roomdId } = params as { roomdId: string };

  const [showCopied, setShowCopied] = useState("COPY");
  const [timeRamaining, setTimeRemaining] = useState<number | null>(20);

  const copyToClipboard = () => {
    const url = new URL(window.location.href);
    navigator.clipboard.writeText(url.toString());
    setShowCopied("COPIED! ✅");
    setTimeout(() => {
      setShowCopied("COPY");
    }, 3000);
  };

  return (
    <main className="flex flex-col h-screen max-h-screen overflow-hidden ">
      <header className="border-b border-zinc-800 p-4 flex items-center justify-between bg-zinc-900/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-500 uppercase">
              Room ID :{" "}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-green-500">{roomdId}</span>
              <button
                onClick={copyToClipboard}
                className="text-[10px] bg-zinc-900 hover:bg-zinc-700 px-2 py-0.5 rounded-md hover:cursor-pointer transition-colors"
              >
                {showCopied}
              </button>
            </div>
          </div>
          <div className="h-8 w-px bg-zinc-800"></div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase text-zinc-500">
              {" "}
              Zelf-Destruct
            </span>
            <span
              className={`text-sm font-bold flex items-center gap-2 ${
                timeRamaining !== null && timeRamaining < 60
                  ? "text-red-500"
                  : "text-amber-500"
              }`}
            >
              {timeRamaining !== null
                ? `${formatTimeRamaining(timeRamaining)}`
                : "--:--"}
            </span>
          </div>
        </div>
        <button className="text-xs bg-zinc-800 hover:bg-red-600 px-3 py-1.5 rounded font-bold hover:text-white transition-all flex items-center gap-2 disabled:opacity-50">
          <span className="group-hover:animate-pulse">💣</span>
          Destroy Room
        </button>
      </header>
    </main>
  );
};

export default Page;
