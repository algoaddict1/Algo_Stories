import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-black text-white font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
