import { useEffect, useState } from "react";

const DURATION = 3500;

const TOAST_CONFIG = {
  success: {
    icon: "✓",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    border: "border-emerald-100",
    barColor: "bg-emerald-500",
  },
  error: {
    icon: "✕",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    border: "border-rose-100",
    barColor: "bg-rose-500",
  },
  info: {
    icon: "ℹ",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100",
    barColor: "bg-blue-500",
  },
  warning: {
    icon: "⚠",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    border: "border-amber-100",
    barColor: "bg-amber-400",
  },
};

const Toast = ({ message, type = "success", onClose }) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  const config = TOAST_CONFIG[type] || TOAST_CONFIG.success;

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 10);

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.max(0, 100 - (elapsed / DURATION) * 100));
    }, 40);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, DURATION);

    return () => {
      clearTimeout(show);
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`relative w-80 overflow-hidden rounded-2xl border bg-white shadow-lg font-mono transition-all duration-300 ${config.border} ${
        visible ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${config.iconBg} ${config.iconColor}`}
        >
          {config.icon}
        </span>

        {/* Message */}
        <p className="flex-1 pt-1 text-sm leading-5 text-slate-700">{message}</p>

        {/* Close */}
        <button
          onClick={handleClose}
          className="shrink-0 text-xl leading-none text-slate-300 transition-colors hover:text-slate-600"
        >
          ×
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-slate-100">
        <div
          className={`h-full transition-none ${config.barColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Toast;
