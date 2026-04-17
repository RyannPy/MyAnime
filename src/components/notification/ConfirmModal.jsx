import { useState } from "react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "Hapus",
  confirmType = "danger",
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  const confirmColors =
    confirmType === "danger"
      ? "bg-rose-500 hover:bg-rose-600 text-white"
      : "bg-blue-600 hover:bg-blue-700 text-white";

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl font-mono">
        {/* Warning Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50">
          <svg
            className="h-6 w-6 text-rose-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-slate-900">Konfirmasi</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Batal
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition disabled:opacity-70 ${confirmColors}`}
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
