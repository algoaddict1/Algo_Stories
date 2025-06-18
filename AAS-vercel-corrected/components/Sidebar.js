import { PenLine, BookOpen, DollarSign, User } from "lucide-react";

export default function Sidebar({ onNavigate }) {
  const buttons = [
    { label: "Write a Story", icon: <PenLine size={20} />, color: "from-green-400 to-green-600", key: "write" },
    { label: "Read Stories", icon: <BookOpen size={20} />, color: "from-blue-400 to-blue-600", key: "read" },
    { label: "Send Tips", icon: <DollarSign size={20} />, color: "from-purple-400 to-purple-600", key: "tips" },
    { label: "About", icon: <User size={20} />, color: "from-pink-400 to-pink-600", key: "about" },
  ];

  return (
    <aside className="h-screen w-64 fixed top-0 left-0 bg-black border-r border-gray-800 flex flex-col py-8 px-4 space-y-4 z-10">
      <h1 className="text-2xl text-white font-bold mb-6 text-center">🚀 AAS</h1>
      {buttons.map((btn) => (
        <button
          key={btn.key}
          onClick={() => onNavigate(btn.key)}
          className={`flex items-center gap-3 text-white px-4 py-3 rounded-xl bg-gradient-to-r ${btn.color} hover:scale-105 transition-all duration-200 shadow-lg`}
        >
          {btn.icon}
          <span className="text-sm font-semibold">{btn.label}</span>
        </button>
      ))}
    </aside>
  );
}
