import { useState } from "react";
import { motion } from "framer-motion";
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";

export default function ChooseWallet({ onWalletChosen }) {
  const [selected, setSelected] = useState(null);
  const peraWallet = new PeraWalletConnect();

  const handleAnonymousWallet = () => {
    const account = algosdk.generateAccount();
    const anonWallet = {
      address: account.addr,
      mnemonic: algosdk.secretKeyToMnemonic(account.sk),
    };
    localStorage.setItem("wallet", JSON.stringify({ address: anonWallet.address, type: "anonymous" }));
    setSelected("anonymous");
    onWalletChosen("anonymous", anonWallet.address);
  };

  const handlePersonalWallet = async () => {
    try {
      const accounts = await peraWallet.connect();
      const address = accounts[0];
      localStorage.setItem("wallet", JSON.stringify({ address, type: "personal" }));
      setSelected("personal");
      onWalletChosen("personal", address);
    } catch (error) {
      console.error("Pera Wallet connection failed:", error);
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
          <p>Use your existing Algorand wallet (e.g., Pera Wallet) to publish stories and receive tips.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={handleAnonymousWallet}
          className="bg-gray-900 p-6 rounded-2xl border border-green-500 cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">🕶️ Use Anonymous Wallet</h2>
          <p>We will generate a temporary anonymous wallet to keep your identity hidden. No registration needed.</p>
        </motion.div>
      </div>

      <div className="text-sm text-center max-w-md mt-4 text-gray-400">
        ✨ <strong>Why anonymous?</strong> Posting anonymously gives you freedom to express without linking your name or wallet identity.
      </div>
    </div>
  );
}
