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
        } else {
          console.warn("🧨 wallet object missing expected fields");
          localStorage.removeItem("wallet");
        }
      } catch (err) {
        console.error("❌ Invalid wallet data in localStorage:", err);
        localStorage.removeItem("wallet");
      }
    }
  }, []);

  return (
    <WalletContext.Provider value={{
      walletType,
      setWalletType,
      walletAddress,
      setWalletAddress
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
