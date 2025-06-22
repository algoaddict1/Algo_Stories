import Sidebar from "../components/Sidebar";

export default function ChallengesPage() {
  const challenges = [
    {
      title: "📝 Anon Story Challenge",
      reward: "10.000 AAS to the most liked post",
      deadline: "Open until June 30",
      description:
        "Write an anonymous story, true or fictional. Touch hearts, speak truth. The most liked or tipped post wins.",
      locked: false,
    },
    {
      title: "🧠 Decentralized Wisdom",
      reward: "50 AAS and NFT badge for the top 3",
      deadline: "Coming soon",
      description:
        "This challenge will be revealed soon. Stay tuned.",
      locked: true,
    },
    {
      title: "👁️ Secret Story Clues",
      reward: "250 AAS to the first wallet that finds all clues",
      deadline: "Coming soon",
      description:
        "This challenge is currently hidden. Are you ready to hunt?",
      locked: true,
    },
  ];

  return (
    <div className="flex bg-black min-h-screen text-white font-mono">
      <Sidebar />
      <main className="flex-1 p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-emerald-400 mb-10">
          Active Challenges
        </h1>

        <div className="space-y-8 max-w-3xl mx-auto">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className={`relative border border-gray-700 rounded-lg p-6 bg-gray-900 shadow-lg transition ${
                challenge.locked
                  ? "blur-sm grayscale opacity-60 cursor-not-allowed hover:shadow-none"
                  : "hover:shadow-emerald-500/30"
              }`}
            >
              <h2 className="text-2xl font-bold text-cyan-300 mb-2 flex items-center gap-2">
                {challenge.title}
                {challenge.locked && <span className="text-yellow-400">🔒</span>}
              </h2>
              <p className="text-gray-300 mb-2">{challenge.description}</p>
              <p className="text-green-400">{challenge.reward}</p>
              <p className="text-sm text-purple-300 italic">{challenge.deadline}</p>

              {challenge.locked && (
                <div className="absolute bottom-4 right-4 text-xs text-yellow-400 italic">
                  Coming soon...
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
