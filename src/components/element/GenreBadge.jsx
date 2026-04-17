const GenreBadge = ({ children }) => {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
      {children}
    </span>
  );
};

export default GenreBadge;
