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
  const [tipAmounts, setTipAmounts] = useState({});
  const [tipTotals, setTipTotals] = useState({});
  const [wallet, setWallet] = useState("MY_WALLET_ADDRESS"); // ⚠️ Sostituire con wallet connesso

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

  const handleTipChange = (storyId, value) => {
    setTipAmounts((prev) => ({
      ...prev,
      [storyId]: value,
    }));
  };

  const sendTip = (storyId, storyWallet, amount) => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) {
      alert("⚠️ Please enter a valid amount");
      return;
    }

    alert(`(Simulazione) Inviare ${numericAmount} ALGO a ${storyWallet}`);

    setTipTotals((prev) => ({
      ...prev,
      [storyId]: (prev[storyId] || 0) + numericAmount,
    }));

    setTipAmounts((prev) => ({
      ...prev,
      [storyId]: "",
    }));
  };

  // 🔝 Filtro delle Hall of Fame (più like o tip ricevuti)
  const hallOfFameStories = dummyStories.filter((story) =>
    likes[story.id] === wallet || (tipTotals[story.id] || 0) > 0
  );

  const regularStories = dummyStories.filter(
    (story) => !hallOfFameStories.includes(story)
  );

  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center text-fuchsia-400">🌌 Anonymous Stories</h1>

        {/* 🏆 Hall of Fame */}
        {hallOfFameStories.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-yellow-400">🏆 Hall of Fame</h2>
            {hallOfFameStories.map((story) => (
              <div
                key={story.id}
                className="bg-gradient-to-r from-purple-700 to-fuchsia-800 p-4 rounded-xl border border-yellow-400 shadow-lg"
              >
                <p className="text-lg font-semibold italic">"{story.content}"</p>
                <div className="text-sm text-gray-200 mt-1">✍️ {story.wallet} • 🕒 {story.timestamp}</div>
                <div className="mt-2 text-sm text-green-300">
                  ❤️ {likes[story.id] ? 1 : 0} Likes • 💸 {tipTotals[story.id] || 0} Tips
                </div>
              </div>
            ))}
          </section>
        )}

        {/* 🔽 Altre storie */}
        {regularStories.map((story) => (
          <div key={story.id} className="bg-gray-900 p-4 rounded-2xl shadow-md border border-fuchsia-600">
            <p className="text-lg">{story.content}</p>
            <div className="text-sm text-gray-400 mt-2">✍️ {story.wallet} • 🕒 {story.timestamp}</div>

            <button
              onClick={() => toggleLike(story.id)}
              className={`mt-4 px-3 py-1 rounded-xl border ${
                likes[story.id] === wallet ? "bg-fuchsia-600" : "border-fuchsia-600"
              }`}
            >
              ❤️ {likes[story.id] ? 1 : 0}
            </button>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Amount (e.g. 1.5)"
                  value={tipAmounts[story.id] || ""}
                  onChange={(e) => handleTipChange(story.id, e.target.value)}
                  className="bg-gray-800 text-white text-sm p-1 px-2 rounded border border-green-400 w-32"
                />
                <button
                  onClick={() => sendTip(story.id, story.wallet, tipAmounts[story.id])}
                  className="px-3 py-1 rounded-xl border border-green-400 hover:bg-green-600"
                >
                  💸 Send Tip
                </button>
              </div>
              <div className="text-sm text-green-300 ml-1">
                Tips Received: {tipTotals[story.id] || 0} ALGO
              </div>
            </div>

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
