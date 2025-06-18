import { useState } from "react";
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

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 bg-gray-900 border border-blue-500 rounded-lg"
        >
          {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || typeof window === "undefined") && (
          <motion.nav
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "tween" }}
            className="fixed top-0 left-0 h-full w-64 bg-black border-r border-blue-500 p-6 space-y-6 z-40 md:relative md:translate-x-0 md:block hidden"
          >
            <h1 className="text-2xl font-bold text-green-400 mb-6">💫 AAS</h1>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="block text-white hover:text-blue-400 text-lg font-semibold transition">
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
