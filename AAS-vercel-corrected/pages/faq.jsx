"use client";

import Sidebar from "../components/Sidebar";

export default function FAQPage() {
  return (
    <div className="flex bg-black min-h-screen text-white font-mono">
      <Sidebar />
      <main className="flex-1 p-8 space-y-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-cyan-400">F.A.Q.</h1>

        <section>
          <h2 className="text-2xl text-green-400">What is Algo Addict Stories?</h2>
          <p className="text-gray-300 mt-2">
            It’s a fully anonymous platform where stories are stored forever on the Algorand blockchain. No identity, no censorship, just emotion and truth.
          </p>
        </section>

        <section>
          <h2 className="text-2xl text-green-400">How do I post a story?</h2>
          <p className="text-gray-300 mt-2">
            Simply choose a temporary anonymous wallet or connect your own, then write and mint your story as an NFT on Algorand.
          </p>
        </section>

        <section>
          <h2 className="text-2xl text-green-400">Are stories really permanent?</h2>
          <p className="text-gray-300 mt-2">
            Yes. Every story is minted as an NFT and stored on-chain. No one can alter or delete it, not even us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl text-green-400">What’s the AAS token used for?</h2>
          <p className="text-gray-300 mt-2">
            AAS is our native token. You can use it to like, comment, or tip your favorite stories and creators. It gives value to your interaction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl text-green-400">Can I read stories without a wallet?</h2>
          <p className="text-gray-300 mt-2">
            Absolutely. Reading is always free and open — no wallet needed. You only need one if you want to post, tip or interact.
          </p>
        </section>

        <section>
          <h2 className="text-2xl text-green-400">What if I lose access to my anonymous wallet?</h2>
          <p className="text-gray-300 mt-2">
            Anonymous wallets are meant to be temporary. If you lose access, we can’t help you recover it. We recommend exporting your keys if you want to keep tips or stories.
          </p>
        </section>
      </main>
    </div>
  );
}
