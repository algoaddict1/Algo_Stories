import Sidebar from "../components/Sidebar";

export default function ChallengesPage() {
  const challenges = [
    {
      title: "📝 Anon Story Challenge",
      reward: "100 AAS to the most liked post",
      deadline: "Open until June 30",
      description:
        "Write an anonymous story, true or fictional. Touch hearts, speak truth. The most liked or tipped post wins.",
    },
    {
      title: "🧠 Decentralized Wisdom",
      reward: "50 AAS and NFT badge for the top 3",
      deadline: "Ends on July 5",
      description:
        "Share a powerful life lesson you learned the hard way. Web3 is also about growth and sharing.",
    },
    {
      title: "👁️ Secret Story Clues",
      reward: "250 AAS to the first wallet that finds all clues",
      deadline: "Ongoing",
      description:
        "Hidden clues are scattered across selected stories. Find them all and claim the reward. The hunt is on.",
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
              className="border border-gray-700 rounded-lg p-6 bg-gray-900 shadow-lg hover:shadow-emerald-500/30 transition"
            >
              <h2 className="text-2xl font-bold text-cyan-300 mb-2">
                {challenge.title}
              </h2>
              <p className="text-gray-300 mb-2">{challenge.description}</p>
              <p className="text-green-400">{challenge.reward}</p>
              <p className="text-sm text-purple-300 italic">{challenge.deadline}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
