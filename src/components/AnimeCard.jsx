const AnimeCard = ({ title, rating, review, image_url }) => {
  const preview = review.length > 100 ? `${review.slice(0, 100)}...` : review;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <img src={image_url} alt={title} className="h-52 w-full object-cover" />

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-blue-600">
              <span>★</span>
              {rating}
            </span>
            <span className="text-slate-400">Rating</span>
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-600">{preview}</p>

        <button className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
          Lihat Detail
        </button>
      </div>
    </article>
  );
};

export default AnimeCard;
