"use client";
import dynamic from "next/dynamic";
import { useAASWallet } from "../context/WalletContext";
import { useEffect, useState } from "react";

const Sidebar = dynamic(() => import("../components/Sidebar"), { ssr: false });
const ChooseWallet = dynamic(() => import("../components/ChooseWallet"), { ssr: false });

export default function WalletPage() {
  const { walletType, walletAddress } = useAASWallet();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (loading || !walletType || !walletAddress) {
    return (
      <div className="flex bg-black min-h-screen text-white">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center p-6">
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
          <h1 className="text-3xl text-center text-cyan-400 mb-8">👛 My Wallet</h1>
          <p className="text-lg mb-2"><strong className="text-blue-400">Address:</strong> {walletAddress}</p>
          <p className="text-lg mb-6"><strong className="text-blue-400">Type:</strong> {walletType}</p>
        </div>
      </main>
    </div>
  );
}
