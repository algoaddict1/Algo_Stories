"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { useWallet } from "../context/WalletContext";
import ChooseWallet from "../components/ChooseWallet";

const dummyStories = [
  { id: 1, content: "The Night of the Algorithm", tips: 2.5, wallet: "WALLET1" },
  { id: 2, content: "Decentralized Dreams", tips: 0.0, wallet: "WALLET2" },
  { id: 3, content: "AAS Anonymous", tips: 1.75, wallet: "WALLET1" },
];

export default function WalletPage() {
  const {
    walletAddress,
    walletType,
    setWalletType,
    setWalletAddress,
  } = useWallet();

  const [hasClaimedAAS, setHasClaimedAAS] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (walletAddress || walletType) {
      setLoading(false);
    }
  }, [walletAddress, walletType]);

  useEffect(() => {
    if (walletAddress) {
      const claimed = localStorage.getItem(`claimed_${walletAddress}`);
      if (claimed === "true") setHasClaimedAAS(true);
    }
  }, [walletAddress]);

  const handleClaimAAS = async () => {
    try {
      const response = await fetch("https://your-backend-url.com/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: walletAddress })
      });

      const data = await response.json();

      if (data.success) {
        setHasClaimedAAS(true);
        localStorage.setItem(`claimed_${walletAddress}`, "true");
        alert("🎉 AAS tokens successfully claimed!");
      } else {
        alert(data.message || "You already claimed your tokens.");
      }
    } catch (err) {
      alert("⚠️ Could not reach backend.");
    }
  };

  if (loading) {
    return <div className="text-white p-10">Loading wallet...</div>;
  }

  if (!walletType || !walletAddress) {
    return (
      <div className="flex bg-black min-h-screen text-white">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center p-6">
          <ChooseWallet
            onWalletChosen={(type, addr) => {
              setWalletType(type);
              setWalletAddress(addr);
            }}
          />
        </main>
      </div>
    );
  }

  const userStories = dummyStories.filter(
    (story) => story.wallet === walletAddress
  );

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
            <strong className="text-blue-400">Wallet Address:</strong> {walletAddress}
          </p>
          <p className="text-lg mb-6">
            <strong className="text-blue-400">Wallet Type:</strong> {walletType}
          </p>

          <div className="mb-6">
            {hasClaimedAAS ? (
              <p className="text-green-400 font-semibold">
                ✅ You have already claimed your AAS tokens.
              </p>
            ) : (
              <button
                onClick={handleClaimAAS}
                className="bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded-xl shadow-md"
              >
                🎁 Claim Your Free AAS Tokens
              </button>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl text-purple-400 mb-2">📜 Your Published Stories</h2>
            {userStories.length === 0 ? (
              <p className="text-gray-400">No stories found for this wallet.</p>
            ) : (
              <ul className="text-gray-300 list-disc ml-6 space-y-1">
                {userStories.map((story) => (
                  <li key={story.id}>
                    “{story.content}” — {story.tips} ALGO in tips
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
