import { useState } from "react";
import algosdk from "algosdk";

// Configurazione Algorand TestNet
const algod = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '');

export default function StoryEditor() {
  const [story, setStory] = useState("");
  const [ipfsHash, setIpfsHash] = useState(null);
  const [txId, setTxId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!story.trim()) return;
    setLoading(true);

    try {
      // 1. Upload su IPFS
      const response = await fetch("https://ipfs.io/api/v0/add?pin=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: new Blob([story], { type: "text/plain" }),
      });

      const text = await response.text();
      const hash = text.match(/"Hash":"([^"]+)"/)?.[1];
      setIpfsHash(hash);

      // 2. Transazione 0 ALGO con nota IPFS
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

      setTxId(txId);
      console.log("✅ Transazione Algorand inviata con nota IPFS:", txId);
    } catch (err) {
      console.error(err);
      alert("Errore durante l'invio della storia su IPFS o Algorand.");
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
          ✅ Story uploaded! IPFS Hash:{" "}
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

      {txId && (
        <div className="mt-2 text-blue-400 break-all">
          🔗 TX on Algorand:{" "}
          <a
            href={`https://testnet.algoexplorer.io/tx/${txId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {txId}
          </a>
        </div>
      )}
    </div>
  );
}
