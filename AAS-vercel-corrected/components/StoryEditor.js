import { useState } from "react";

export default function StoryEditor() {
  const [story, setStory] = useState("");
  const [ipfsHash, setIpfsHash] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!story.trim()) return;
    setLoading(true);

    try {
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
    } catch (err) {
      alert("Error uploading to IPFS.");
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
