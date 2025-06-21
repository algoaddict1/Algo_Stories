import { useState } from "react";
import Image from "next/image";
import ChooseWallet from "../components/ChooseWallet";
import Sidebar from "../components/Sidebar";
import StoryEditor from "../components/StoryEditor";

export default function Home() {
  const [walletType, setWalletType] = useState(null);
  const [page, setPage] = useState("write");

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar onNavigate={setPage} />

      <main className="flex-1 p-4 md:p-8">
        {/* Logo in alto */}
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={180} height={180} />
        </div>

        {page === "write" && (
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              {!walletType ? (
                <div className="text-center space-y-4">
                  <p className="text-gray-400 text-lg">
                    🔐 Connect a wallet to write an anonymous story.
                  </p>
                  <ChooseWallet onWalletChosen={setWalletType} />
                </div>
              ) : (
                <StoryEditor />
              )}
            </div>
          </div>
        )}

        {page === "read" && (
          <h1 className="text-3xl text-center mt-10 text-purple-400">
            📖 Read Stories
          </h1>
        )}

        {page === "tips" && (
          <h1 className="text-3xl text-center mt-10 text-green-400">
            💸 Send Tips
          </h1>
        )}

        {page === "about" && (
          <h1 className="text-3xl text-center mt-10 text-cyan-400">
            🧑‍🚀 About
          </h1>
        )}
      </main>
    </div>
  );
}
