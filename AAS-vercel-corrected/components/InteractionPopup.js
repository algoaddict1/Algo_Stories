export default function InteractionPopup({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md text-white text-center space-y-4 border border-green-400">
        <h2 className="text-xl font-bold text-green-400">💡 Interactions cost AAS</h2>
        <p>
          ❤️ Like → <strong>500 AAS</strong><br />
          💬 Comment → <strong>500 AAS</strong><br />
        </p>
        <p className="text-sm text-gray-300">
          This helps us protect the platform from spam and keep every interaction meaningful.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button onClick={onCancel} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-green-500 px-4 py-2 rounded hover:bg-green-400">
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
}
