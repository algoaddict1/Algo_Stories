import { useState } from "react";
import { useAASWallet } from "../context/WalletContext";

export default function StoryEditor() {
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const { walletType, walletAddress } = useAASWallet();

  const handleSubmit = async () => {
    if (!story.trim() || !walletAddress) return;
    setLoading(true);

    try {
      const response = await fetch("https://aas-backend-mpoy.onrender.com/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet: walletAddress,
          content: story,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unknown error");
      }

      alert(`✅ Story minted as NFT!\nNFT ID: ${result.nft_id}`);
      // Optional: open in explorer
      // window.open(`https://testnet.algoexplorer.io/asset/${result.nft_id}`, "_blank");

      setStory(""); // reset
    } catch (err) {
      console.error("❌ Error submitting story:", err);
      alert("Failed to submit your story.");
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
        {loading ? "Publishing..." : "Submit Story"}
      </button>
    </div>
  );
}
