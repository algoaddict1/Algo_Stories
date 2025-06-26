
"use client";
import { useEffect, useState } from "react";
import { useAASWallet } from "../context/WalletContext";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function WalletPage() {
  const { walletType, walletAddress } = useAASWallet();
  const [hasClaimedAAS, setHasClaimedAAS] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      typeof walletType !== "string" ||
      typeof walletAddress !== "string" ||
      !walletType ||
      !walletAddress
    ) {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [walletType, walletAddress]);

  const handleClaimAAS = async () => {
    if (!walletAddress || typeof walletAddress !== "string") {
      alert("Connect your wallet before claiming.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://your-backend-url.com/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: walletAddress }),
      });
      const data = await response.json();
      if (data.success) {
        setHasClaimedAAS(true);
        alert("🎉 AAS tokens successfully claimed!");
      } else {
        alert(data.message || "You already claimed your tokens.");
      }
    } catch {
      alert("Something went wrong while claiming tokens.");
    } finally {
      setLoading(false);
    }
  };

  if (!walletType || !walletAddress || typeof walletType !== "string" || typeof walletAddress !== "string") {
    return (
      <div className="flex bg-black min-h-screen text-white">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <p className="text-gray-400 text-lg animate-pulse">
            🔄 Waiting for wallet connection...
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 px-4 py-2 bg-cyan-600 rounded-lg text-white hover:bg-cyan-800"
          >
            🔁 Choose Wallet
          </button>
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
            {typeof walletAddress === "string" ? walletAddress : "Invalid"}
          </p>
          <p className="text-lg mb-6">
            <strong className="text-blue-400">Wallet Type:</strong>{" "}
            {typeof walletType === "string" ? walletType : "Invalid"}
          </p>

          <div className="mb-6">
            {hasClaimedAAS ? (
              <p className="text-green-400 font-semibold">
                ✅ You have already claimed your AAS tokens.
              </p>
            ) : (
              <button
                onClick={handleClaimAAS}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded-xl shadow-md disabled:opacity-50"
              >
                {loading ? "⏳ Claiming..." : "🎁 Claim Your Free AAS Tokens"}
              </button>
            )}
          </div>

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
