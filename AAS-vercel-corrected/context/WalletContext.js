import { createContext, useContext, useState, useEffect } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletType, setWalletType] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("wallet");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.address && parsed.type) {
          setWalletAddress(parsed.address);
          setWalletType(parsed.type);
        }
      } catch (err) {
        console.error("Error parsing wallet from localStorage", err);
      }
    }
  }, []);

  return (
    <WalletContext.Provider value={{ walletType, setWalletType, walletAddress, setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
