"use client";
import { motion } from "framer-motion";
import { PeraWalletConnect } from "@perawallet/connect";
import { useAASWallet } from "../context/WalletContext";

export default function ChooseWallet({ onWalletChosen }) {
  const peraWallet = new PeraWalletConnect();
  const { setWalletType, setWalletAddress } = useAASWallet();

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
          className="bg-gray-800 p-6 rounded-2xl border border-gray-500 cursor-not-allowed opacity-50"
        >
          <h2 className="text-xl font-semibold mb-2">🕶️ Anonymous Wallet</h2>
          <p>Coming Soon...</p>
        </motion.div>
      </div>
    </div>
  );
}
