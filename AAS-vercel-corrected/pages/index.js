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
    <div className="bg-black min-h-screen text-white pl-64">
      <Sidebar onNavigate={setPage} />
      <main className="p-6">
        {page === "write" && <StoryEditor />}
        {page === "read" && <h1 className="text-3xl">📖 Read Stories</h1>}
        {page === "tips" && <h1 className="text-3xl">💸 Send Tips</h1>}
        {page === "about" && <h1 className="text-3xl">🧑‍🚀 About</h1>}
      </main>
    </div>
  );
}
