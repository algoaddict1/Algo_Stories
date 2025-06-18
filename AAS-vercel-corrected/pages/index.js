import { useState } from "react";
import ChooseWallet from "../components/ChooseWallet";
import Sidebar from "../components/Sidebar";
import StoryEditor from "../components/StoryEditor";

export default function Home() {
  const [walletType, setWalletType] = useState(null);
  const [page, setPage] = useState("write");

  if (!walletType) {
    return <ChooseWallet onWalletChosen={setWalletType} />;
  }

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar onNavigate={setPage} />

      <main className="flex-1 p-4 md:p-8">
        {page === "write" && (
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <StoryEditor />
            </div>
          </div>
        )}

        {page === "read" && (
          <h1 className="text-3xl text-center mt-10">📖 Read Stories</h1>
        )}

        {page === "tips" && (
          <h1 className="text-3xl text-center mt-10">💸 Send Tips</h1>
        )}

        {page === "about" && (
          <h1 className="text-3xl text-center mt-10">🧑‍🚀 About</h1>
        )}
      </main>
    </div>
  );
}
