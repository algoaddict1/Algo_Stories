import { WalletProvider } from "../context/WalletContext";
import '../styles/globals.css'; 
export default function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
}
