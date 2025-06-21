"use client";

import Sidebar from "../components/Sidebar";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex bg-black min-h-screen text-white font-mono">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-3xl text-center space-y-8">
          {/* LOGO CENTRALE INGRANDITO */}
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Algo Addict Stories Logo"
              width={240}
              height={240}
              priority
            />
          </div>

          {/* DESCRIZIONE PULITA */}
          <p className="text-xl text-gray-300 leading-relaxed">
            ✍️ Write your story anonymously on the Algorand blockchain.<br />
            🧠 No identity. No censorship. Just raw truth.<br />
            💸 Earn tips. Gain support. Leave your mark forever.
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
