"use client";

import Sidebar from "../components/Sidebar";

export default function About() {
  return (
    <div className="flex bg-black min-h-screen text-white font-mono">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-400">
            About Algo Addict Stories
          </h1>
          <p className="text-lg leading-relaxed text-gray-300">
            <strong>Algo Addict Stories</strong> is the first anonymous Web3 space where stories live on the blockchain.<br /><br />
            No identity. No censorship. Just truth, emotion, and freedom.<br />
            Every post is permanent. Every tip is direct. Every interaction is decentralized.<br /><br />
            <em>Write. Read. Love. With full anonymity.</em><br />
            We’re building the future of social media — one story at a time.
          </p>
        </div>
      </main>
    </div>
  );
}
