import { createContext, useContext, useState, useEffect } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletType, setWalletType] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const anon = localStorage.getItem("anonymous_wallet");
    const personal = localStorage.getItem("personal_wallet");

    if (anon) {
      const parsed = JSON.parse(anon);
      setWalletType("anonymous");
      setWalletAddress(parsed.address);
    } else if (personal) {
      const parsed = JSON.parse(personal); // 🔧 aggiunto parsing corretto
      setWalletType("personal");
      setWalletAddress(parsed.address);     // 🔧 corretto accesso all'indirizzo
    }
  }, []);

  return (
    <WalletContext.Provider value={{ walletType, setWalletType, walletAddress, setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
