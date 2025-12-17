"use client";

import { useParams } from "next/navigation";
import { useRef, useState } from "react";

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

  const [inputMessage, setInputMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [showCopied, setShowCopied] = useState("COPY");
  const [timeRamaining, setTimeRemaining] = useState<number | null>(600);

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
              Time Remaining :
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"></div>

      {/* Messages Container */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
        <div className="flex gap-4">
          <div className="flex-1 relative group">
            <span className="absolute left-4 top-1/2  -translate-y-1/2 text-green-500 animate-pulse text-xl">
              {">"}
            </span>
            <input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputMessage.trim()) {
                  inputRef.current?.focus();
                  //   Send the message logic here
                }
              }}
              autoFocus
              placeholder="Type your message..."
              type="text"
              className="w-full bg-black border border-zinc-800 focus:border-zinc-700 focus:outline-none transition-colors text-zinc-100 placeholder:text-zinc-700 py-3 pl-8 pr-4 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-zinc-800 text-zinc-400 px-6 text-sm font-bold hover:text-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
};

export default Page;
