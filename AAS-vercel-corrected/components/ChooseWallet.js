"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";
import { useAASWallet } from "../context/WalletContext";

export default function ChooseWallet({ onWalletChosen }) {
  const router = useRouter();
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
    router.push("/wallet");
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
      router.push("/wallet");
    } catch (e) {
      console.error("Wallet connection failed", e);
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
