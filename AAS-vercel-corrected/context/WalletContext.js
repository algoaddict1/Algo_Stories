import { createContext, useContext, useState, useEffect } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletType, setWalletType] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  const loadWallet = () => {
    const stored = localStorage.getItem("wallet");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.type && parsed?.address) {
          setWalletType(parsed.type);
          setWalletAddress(parsed.address);
        }
      } catch {
        localStorage.removeItem("wallet");
      }
    }
  };

  useEffect(() => {
    loadWallet(); // iniziale

    // 👇 ascolta eventuali cambiamenti esterni
    const handleStorageChange = () => {
      loadWallet();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <WalletContext.Provider
      value={{ walletType, walletAddress, setWalletType, setWalletAddress }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useAASWallet = () => useContext(WalletContext);
