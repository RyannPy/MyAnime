const StatsCard = ({ icon, title, value, description }) => {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
        <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </article>
  );
};

export default StatsCard;
