const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-4",
  lg: "h-12 w-12 border-4",
};

/**
 * Reusable loading spinner component.
 * @param {string} size - "sm" | "md" | "lg" (default: "md")
 * @param {string|null} text - Label shown below spinner (default: "Loading..."), pass null to hide
 * @param {boolean} fullscreen - If true, renders centered on full screen (default: false)
 */
const LoadingSpinner = ({ size = "md", text = "Loading...", fullscreen = false }) => {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`animate-spin rounded-full border-blue-200 border-t-blue-600 ${sizeMap[size]}`}
      />
      {text && <p className="text-sm font-mono text-slate-500">{text}</p>}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
