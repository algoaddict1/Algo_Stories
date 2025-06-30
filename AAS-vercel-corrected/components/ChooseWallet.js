"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";
import { useAASWallet } from "../context/WalletContext";

export default function ChooseWallet({ onWalletChosen }) {
  const [selected, setSelected] = useState(null);
  const peraWallet = new PeraWalletConnect();
  const { setWalletType, setWalletAddress } = useAASWallet();

  const handleAnonymousWallet = () => {
    const account = algosdk.generateAccount();
    const type = "anonymous";
    const address = account.addr;
    const mnemonic = algosdk.secretKeyToMnemonic(account.sk);

    const walletData = { type, address, mnemonic };
    localStorage.setItem("wallet", JSON.stringify(walletData));
    setWalletType(type);
    setWalletAddress(address);
    if (onWalletChosen) onWalletChosen(type, address);
  };

  const handlePersonalWallet = async () => {
    try {
      const accounts = await peraWallet.connect();
      const type = "personal";
      const address = accounts[0];

      const walletData = { type, address };
      localStorage.setItem("wallet", JSON.stringify(walletData));
      setWalletType(type);
      setWalletAddress(address);
      if (onWalletChosen) onWalletChosen(type, address);
    } catch (e) {
      console.error("❌ Wallet connection failed:", e);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 space-y-8">
      <h1 className="text-3xl md:text-5xl font-bold text-center">🛡️ Choose Your Wallet</h1>
      <p className="text-center text-lg max-w-xl">
        We respect your privacy. Choose how you want to post your story:
      </p>
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={handlePersonalWallet}
          className="bg-gray-900 p-6 rounded-2xl border border-blue-500 cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">🔓 Connect Your Wallet</h2>
          <p>Use your existing Algorand wallet (e.g., Pera Wallet).</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={handleAnonymousWallet}
          className="bg-gray-900 p-6 rounded-2xl border border-green-500 cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">🕶️ Use Anonymous Wallet</h2>
          <p>We will generate a temporary wallet with no link to your identity.</p>
        </motion.div>
      </div>
    </div>
  );
}


// ✅ pages/post.js (dove c'è StoryEditor)
import { useState } from "react";
import Image from "next/image";
import ChooseWallet from "../components/ChooseWallet";
import Sidebar from "../components/Sidebar";
import StoryEditor from "../components/StoryEditor";
import { useAASWallet } from "../context/WalletContext";

export default function PostPage() {
  const { walletType, walletAddress, setWalletType, setWalletAddress } = useAASWallet();
  const [page, setPage] = useState("write");

  const handleWalletChosen = (type, address) => {
    setWalletType(type);
    setWalletAddress(address);
    localStorage.setItem("wallet", JSON.stringify({ type, address }));
  };

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar onNavigate={setPage} />
      <main className="flex-1 p-4 md:p-8">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={180} height={180} />
        </div>
        {!walletType || !walletAddress ? (
          <div className="text-center space-y-4">
            <p className="text-gray-400 text-lg">
              🔐 Connect a wallet to write an anonymous story.
            </p>
            <ChooseWallet onWalletChosen={handleWalletChosen} />
          </div>
        ) : (
          <StoryEditor />
        )}
      </main>
    </div>
  );
}


// ✅ pages/wallet.js
"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAASWallet } from "../context/WalletContext";

const Sidebar = dynamic(() => import("../components/Sidebar"), { ssr: false });
const ChooseWallet = dynamic(() => import("../components/ChooseWallet"), { ssr: false });

export default function WalletPage() {
  const { walletType, walletAddress } = useAASWallet();
  const [hasClaimedAAS, setHasClaimedAAS] = useState(false);

  if (!walletType || !walletAddress) {
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
        <div className="max-w-xl w-full bg-zinc-900 p-6 rounded-2xl border border-cyan-600">
          <h1 className="text-3xl text-center text-cyan-400 mb-8">👛 My Wallet</h1>
          <p className="text-lg mb-4"><strong className="text-blue-400">Wallet Address:</strong> {walletAddress}</p>
          <p className="text-lg mb-6"><strong className="text-blue-400">Wallet Type:</strong> {walletType}</p>
        </div>
      </main>
    </div>
  );
}
