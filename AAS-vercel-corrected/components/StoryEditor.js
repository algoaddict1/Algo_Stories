import { useState } from "react";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import algosdk from "algosdk";

// Inizializza IPFS client
const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

// Inizializza Algorand client
const algod = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '');

export default function StoryEditor() {
  const [story, setStory] = useState("");
  const [ipfsHash, setIpfsHash] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!story.trim()) return;
    setLoading(true);

    try {
      // Caricamento su IPFS
      const file = Buffer.from(story);
      const result = await ipfs.add(file);
      const hash = result.path;
      setIpfsHash(hash);

      // Salvataggio su Algorand
      const wallet = JSON.parse(localStorage.getItem("anonymous_wallet"));
      const privateKey = algosdk.mnemonicToSecretKey(wallet.mnemonic).sk;

      const params = await algod.getTransactionParams().do();
      const note = new TextEncoder().encode(`ipfs://${hash}`);

      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: wallet.address,
        to: wallet.address,
        amount: 0,
        note,
        suggestedParams: params,
      });

      const signedTxn = txn.signTxn(privateKey);
      const { txId } = await algod.sendRawTransaction(signedTxn).do();
      await algod.statusAfterBlock(params.lastRound + 1).do();

      console.log("✅ Transazione Algorand inviata:", txId);
    } catch (err) {
      console.error("❌ Errore:", err);
      alert("Errore durante il caricamento su IPFS o Algorand.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">✍️ Write Your Story</h2>
      <textarea
        className="w-full h-64 p-3 bg-black text-white border border-gray-700 rounded-lg resize-none focus:outline-none"
        placeholder="Write your anonymous story here..."
        value={story}
        onChange={(e) => setStory(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl font-semibold hover:scale-105 transition"
      >
        {loading ? "Uploading to IPFS..." : "Submit Story"}
      </button>

      {ipfsHash && (
        <div className="mt-4 text-green-400 break-all">
          ✅ Story uploaded! IPFS Hash:  
          <a
            href={`https://ipfs.io/ipfs/${ipfsHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {ipfsHash}
          </a>
        </div>
      )}
    </div>
  );
}
