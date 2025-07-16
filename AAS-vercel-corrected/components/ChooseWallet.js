"use client";
import { useRouter } from "next/navigation";
import { useAASWallet } from "../context/WalletContext";
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";
import { motion } from "framer-motion";

export default function ChooseWallet() {
  const { setWalletType, setWalletAddress } = useAASWallet();
  const router = useRouter();

  const handleAnonymous = () => {
    const account = algosdk.generateAccount();
    const type = "anonymous";
    const address = account.addr;
    const mnemonic = algosdk.secretKeyToMnemonic(account.sk);
    localStorage.setItem("wallet", JSON.stringify({ type, address, mnemonic }));
    setWalletType(type);
    setWalletAddress(address);
    router.replace("/wallet");
  };

  const handlePersonal = async () => {
    const pera = new PeraWalletConnect();
    try {
      const accounts = await pera.connect();
      const address = accounts[0];
      const type = "personal";
      localStorage.setItem("wallet", JSON.stringify({ type, address }));
      setWalletType(type);
      setWalletAddress(address);
      router.replace("/wallet");
    } catch (e) {
      console.error("Pera Wallet connection failed", e);
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
          onClick={handlePersonal}
          className="bg-gray-900 p-6 rounded-2xl border border-blue-500 cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">🔓 Connect Wallet</h2>
          <p>Use your Algorand wallet (Pera Wallet, etc).</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={handleAnonymous}
          className="bg-gray-900 p-6 rounded-2xl border border-green-500 cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">🕶️ Anonymous Wallet</h2>
          <p>We'll generate a temporary wallet without identity links.</p>
        </motion.div>
      </div>
    </div>
  );
}

