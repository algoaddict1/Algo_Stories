"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAASWallet } from "../context/WalletContext";
import { motion } from "framer-motion";

const Sidebar = dynamic(() => import("../components/Sidebar"), { ssr: false });
const ChooseWallet = dynamic(() => import("../components/ChooseWallet"), { ssr: false });

export default function WalletPage() {
  const { walletType, walletAddress } = useAASWallet();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  if (
    loading ||
    !walletType ||
    !walletAddress ||
    typeof walletType !== "string" ||
    typeof walletAddress !== "string"
  ) {
    return (
      <div className="flex bg-black min-h-screen text-white">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <ChooseWallet />
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />
      <main className="flex-1 p-6 md:p-12 flex items-center justify-center">
        <div className="max-w-xl w-full bg-zinc-900 p-6 rounded-2xl border border-cyan-600 shadow-md">
          <motion.h1
            className="text-3xl text-center text-cyan-400 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            👛 My Wallet
          </motion.h1>

          <p className="text-lg mb-4">
            <strong className="text-blue-400">Wallet Address:</strong>{" "}
            {walletAddress}
          </p>
          <p className="text-lg mb-6">
            <strong className="text-blue-400">Wallet Type:</strong>{" "}
            {walletType}
          </p>

          <div className="mt-8">
            <h2 className="text-xl text-purple-400 mb-2">📜 Your Published Stories</h2>
            <p className="text-sm text-gray-400 mb-2">* Dynamic list coming soon.</p>
            <ul className="text-gray-300 list-disc ml-6 space-y-1">
              <li>"The Night of the Algorithm" — 2.5 ALGO in tips</li>
              <li>"Decentralized Dreams" — 0.0 ALGO</li>
              <li>"AAS Anonymous" — 1.75 ALGO</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
