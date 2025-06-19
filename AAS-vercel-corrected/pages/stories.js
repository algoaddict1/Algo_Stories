import { useState } from "react";
import Sidebar from "../components/Sidebar";

const dummyStories = [
  {
    id: 1,
    content: "First anonymous story on the blockchain.",
    wallet: "ALGO1XXXXX",
    timestamp: "2025-06-19",
  },
  {
    id: 2,
    content: "I left everything behind. Now I write for myself.",
    wallet: "ALGO2YYYYY",
    timestamp: "2025-06-18",
  },
];

export default function Stories() {
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [wallet, setWallet] = useState("MY_WALLET_ADDRESS"); // ⚠️ Sostituire con wallet collegato

  const toggleLike = (storyId) => {
    setLikes((prev) => ({
      ...prev,
      [storyId]: prev[storyId] === wallet ? null : wallet,
    }));
  };

  const handleCommentSubmit = (storyId, commentText) => {
    if (!commentText) return;
    setComments((prev) => ({
      ...prev,
      [storyId]: [...(prev[storyId] || []), { text: commentText, from: wallet }],
    }));
  };

  const sendTip = (storyWallet) => {
    alert(`(Simulazione) Inviare tips a ${storyWallet}`);
    // Qui si collega a Algorand SDK o backend Flask
  };

  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center text-fuchsia-400">🌌 Anonymous Stories</h1>

        {dummyStories.map((story) => (
          <div key={story.id} className="bg-gray-900 p-4 rounded-2xl shadow-md border border-fuchsia-600">
            <p className="text-lg">{story.content}</p>
            <div className="text-sm text-gray-400 mt-2">✍️ {story.wallet} • 🕒 {story.timestamp}</div>

            {/* Likes */}
            <button
              onClick={() => toggleLike(story.id)}
              className={`mt-4 px-3 py-1 rounded-xl border ${
                likes[story.id] === wallet ? "bg-fuchsia-600" : "border-fuchsia-600"
              }`}
            >
              ❤️ {likes[story.id] ? 1 : 0}
            </button>

            {/* Tips */}
            <button
              onClick={() => sendTip(story.wallet)}
              className="ml-4 px-3 py-1 rounded-xl border border-green-400 hover:bg-green-600"
            >
              💸 Tip
            </button>

            {/* Commenti */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-fuchsia-300 mb-1">💬 Comments</h3>
              <ul className="space-y-1 text-sm">
                {(comments[story.id] || []).map((c, idx) => (
                  <li key={idx} className="text-gray-300">
                    {c.text} <span className="text-xs text-gray-500">({c.from})</span>
                  </li>
                ))}
              </ul>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.target.elements[`comment-${story.id}`];
                  handleCommentSubmit(story.id, input.value);
                  input.value = "";
                }}
                className="mt-2"
              >
                <input
                  name={`comment-${story.id}`}
                  placeholder="Write a comment..."
                  className="bg-gray-800 text-white text-sm p-1 px-2 rounded border border-fuchsia-600 w-full"
                />
              </form>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
