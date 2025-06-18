import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const links = [
  { label: "Home", href: "/" },
  { label: "Post a Story", href: "/post" },
  { label: "My Wallet", href: "/wallet" },
  { label: "About", href: "/about" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      {/* Mobile button */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 bg-gray-900 border border-blue-500 rounded-lg"
          >
            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.nav
            initial={{ x: isMobile ? -300 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "tween" }}
            className="fixed md:relative top-0 left-0 h-full w-64 bg-black border-r border-blue-500 p-6 space-y-6 z-40"
          >
            <h1 className="text-2xl font-bold text-green-400 mb-6">💫 AAS</h1>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="block text-white hover:text-blue-400 text-lg font-semibold transition"
                      onClick={() => isMobile && setIsOpen(false)} // chiudi menu su mobile
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
