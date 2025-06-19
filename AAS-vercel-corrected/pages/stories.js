import Sidebar from "../components/Sidebar";

const dummyStories = [
  {
    id: 1,
    content: "First anonymous story on the blockchain. A tale of freedom and code.",
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
  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-fuchsia-400">🌌 Anonymous Stories</h1>
        <div className="space-y-6">
          {dummyStories.map((story) => (
            <div key={story.id} className="bg-gray-900 p-4 rounded-2xl shadow-md border border-fuchsia-600">
              <p className="text-lg">{story.content}</p>
              <div className="text-sm text-gray-400 mt-2">✍️ {story.wallet} • 🕒 {story.timestamp}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
