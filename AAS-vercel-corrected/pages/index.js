"use client";

import Sidebar from "../components/Sidebar";

export default function HomePage() {
  return (
    <div className="flex bg-black min-h-screen text-white font-mono">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-3xl text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-green-400">
            Algo Addict Stories
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            ✍️ Share your story anonymously on the Algorand blockchain.<br />
            🧠 No identity, no censorship, just pure expression.<br />
            💸 Earn tips, receive feedback, and become immortal — one story at a time.
          </p>
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
