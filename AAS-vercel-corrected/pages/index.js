"use client";

import Sidebar from "../components/Sidebar";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex bg-black min-h-screen text-white font-mono">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-3xl text-center space-y-8">
          {/* LOGO CENTRALE */}
          <div className="flex justify-center">
            <Image
              src="/logo.png" // Assicurati che il file si chiami così nella cartella /public
              alt="BLIK Logo"
              width={160}
              height={160}
              className="rounded-full"
              priority
            />
          </div>

          {/* TITOLO E SLOGAN */}
          <h1 className="text-5xl md:text-6xl font-bold text-green-400">
            Algo Addict Stories
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed">
            ✍️ Share your story anonymously on the Algorand blockchain.<br />
            🧠 No identity, no censorship, just pure expression.<br />
            💸 Earn tips, receive feedback, and become immortal — one story at a time.
          </p>

          {/* PULSANTE */}
          <a
            href="/post"
            className="inline-block px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-lg transition-all duration-200"
          >
            Start Writing
          </a>
        </div>
      </main>
    </div>
  );
}
