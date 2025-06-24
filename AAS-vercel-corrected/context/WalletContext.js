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
        if (parsed && parsed.type && parsed.address) {
          setWalletType(parsed.type);
          setWalletAddress(parsed.address);
        }
      } catch (err) {
        console.error("Invalid wallet in localStorage:", err);
        localStorage.removeItem("wallet");
      }
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{ walletType, walletAddress, setWalletType, setWalletAddress }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
