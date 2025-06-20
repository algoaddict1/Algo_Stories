 import Sidebar from "../components/Sidebar";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import tokenomics from '../data/tokenomics.json';

const COLORS = ["#00FFAA", "#00CCFF", "#AA00FF", "#00FF66", "#FF00AA", "#FFAA00"];

export default function TokenPage() {
  return (
    <div className="flex bg-black min-h-screen text-white font-mono">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8">
        <motion.h1
          className="text-4xl text-center mb-6 text-fuchsia-400"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          💠 Algo Addict Stories Token (AAS)
        </motion.h1>

        <motion.div
          className="max-w-4xl mx-auto bg-zinc-900 p-6 rounded-2xl shadow-xl border border-fuchsia-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p className="text-lg mb-6 text-emerald-300">
            AAS (Algo Addict Stories) è il token ufficiale della piattaforma. Viene utilizzato per inviare tips, incentivare la community e finanziare lo sviluppo decentralizzato del progetto.
          </p>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tokenomics}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                >
                  {tokenomics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-2 text-sm text-gray-300">
              <p><strong className="text-purple-400">Token Name:</strong> Algo Addict Stories</p>
              <p><strong className="text-purple-400">Symbol:</strong> AAS</p>
              <p><strong className="text-purple-400">Total Supply:</strong> 1.000.000.000.000</p>
              <p><strong className="text-purple-400">Blockchain:</strong> Algorand</p>
              <p><strong className="text-purple-400">Token Type:</strong> ASA</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
